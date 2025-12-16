import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useMemo } from "react";
import { deleteUser } from "../api/users";
import { DeleteDialog } from "./DeleteDialog";
import { useUsers } from "../hooks/useUsers";

export const UsersTable = () => {
	const { rows, total, loading, query, updateParams, refresh } = useUsers();
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const paginationModel = useMemo(
		() => ({ page: query.page - 1, pageSize: query.limit }),
		[query.page, query.limit],
	);

	return (
		<>
			<DataGrid
				rows={rows}
				loading={loading}
				paginationMode="server"
				sortingMode="server"
				filterMode="server"
				rowCount={Number.isFinite(total) ? total : rows.length}
				paginationModel={paginationModel}
				onPaginationModelChange={(model) =>
					updateParams({
						page: model.page + 1,
						limit: model.pageSize,
					})
				}
				pageSizeOptions={[10, 25, 50]}
				onSortModelChange={(m) => {
					const sortModel = m[0];
					if (!sortModel) return;
					const sortDirection = sortModel.sort;
					if (sortDirection !== "asc" && sortDirection !== "desc") return;

					updateParams({
						sort: sortModel.field,
						order: sortDirection,
					});
				}}
				columns={[
					{ field: "firstName", headerName: "First Name", flex: 1 },
					{ field: "lastName", headerName: "Last Name", flex: 1 },
					{ field: "email", headerName: "Email", flex: 1 },
					{
						field: "actions",
						headerName: "",
						renderCell: (p) => (
							<IconButton onClick={() => setDeleteId(p.row.id)}>
								<DeleteIcon color="error" />
							</IconButton>
						),
					},
				]}
			/>

			<DeleteDialog
				open={!!deleteId}
				onClose={() => setDeleteId(null)}
				onConfirm={() => {
				if (deleteId === null) return;
				deleteUser(deleteId).finally(() => {
					refresh();
					setDeleteId(null);
				});
			}}
		/>
		</>
	);
};
