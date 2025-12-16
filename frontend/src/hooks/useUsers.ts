import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchUsers } from "../api/users";
import type { User, UsersQuery } from "../types/users";

export const useUsers = () => {
	const [params, setParams] = useSearchParams();
	const [rows, setRows] = useState<User[]>([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);

	const query: UsersQuery = useMemo(
		() => ({
			page: Math.max(1, Number(params.get("page") || 1)),
			limit: Number(params.get("limit") || 10),
			sort: params.get("sort") || "lastName",
			order: (params.get("order") as "asc" | "desc") || "asc",
			search: params.get("search") ?? undefined,
			countryId: params.get("countryId") ?? undefined,
			roleName: params.get("roleName") ?? undefined,
		}),
		[params],
	);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const { data, total } = await fetchUsers(query);
			setRows(data);
			setTotal(total);
		} finally {
			setLoading(false);
		}
	}, [query]);

	useEffect(() => {
		void fetchData();
	}, [fetchData]);

	const updateParams = (updates: Partial<UsersQuery>) => {
		setParams((prev) => {
			const next = new URLSearchParams(prev);

			const updateKeys = Object.keys(updates) as (keyof UsersQuery)[];
			for (const key of updateKeys) {
				const value = updates[key];
				if (value === undefined || value === null || value === "") {
					next.delete(key);
					continue;
				}
				next.set(key, String(value));
			}

			next.set("page", String(updates.page ?? 1));

			return next;
		});
	};

	const refresh = () => void fetchData();

	return { rows, total, loading, query, updateParams, refresh };
};
