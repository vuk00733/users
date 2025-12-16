import { MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCountries, fetchRoles } from "../api/users";
import type { Country, Role, UsersQuery } from "../types/users";

type FilterQuery = Pick<UsersQuery, "search" | "countryId" | "roleName">;

interface Props {
	query: FilterQuery;
	onChange: (params: Partial<FilterQuery>) => void;
}

const fieldSx = {
	flex: { xs: "1 1 100%", sm: "1 1 0" },
	minWidth: 0,
};

const selectSlotProps = {
	inputLabel: { shrink: true },
	select: { displayEmpty: true },
};

type FilterOption = {
	value: string;
	label: string;
};

interface FilterSelectProps {
	label: string;
	value: string;
	options: FilterOption[];
	onChange: (value: string) => void;
}

const FilterSelect = ({
	label,
	value,
	options,
	onChange,
}: FilterSelectProps) => (
	<TextField
		select
		label={label}
		value={value ?? ""}
		onChange={(event) => onChange(event.target.value)}
		sx={fieldSx}
		slotProps={selectSlotProps}
	>
		<MenuItem value="">All</MenuItem>
		{options.map((option) => (
			<MenuItem key={`${label}-${option.value}`} value={option.value}>
				{option.label}
			</MenuItem>
		))}
	</TextField>
);

export const Filters = ({ query, onChange }: Props) => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [roles, setRoles] = useState<Role[]>([]);

	useEffect(() => {
		fetchCountries().then((data) =>
			setCountries(
				[...data].sort((a, b) => a.name.localeCompare(b.name)),
			),
		);
		fetchRoles().then((data) =>
			setRoles(
				[...data].sort((a, b) => a.name.localeCompare(b.name)),
			),
		);
	}, []);

	const countryOptions = countries.map((country) => ({
		value: String(country.id),
		label: country.name,
	}));

	const roleOptions = roles.map((role) => ({
		value: role.name,
		label: role.name,
	}));

	return (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			spacing={2}
			alignItems={{ xs: "stretch", sm: "flex-end" }}
			sx={{
				width: "100%",
				maxWidth: "100%",
			}}
		>
			<TextField
				label="Search"
				value={query.search ?? ""}
				onChange={(e) => onChange({ search: e.target.value })}
				sx={{ ...fieldSx, maxWidth: "100%" }}
				fullWidth
			/>

			<FilterSelect
				label="Country"
				value={query.countryId ?? ""}
				options={countryOptions}
				onChange={(value) => onChange({ countryId: value })}
			/>

			<FilterSelect
				label="Role"
				value={query.roleName ?? ""}
				options={roleOptions}
				onChange={(value) => onChange({ roleName: value })}
			/>
		</Stack>
	);
};
