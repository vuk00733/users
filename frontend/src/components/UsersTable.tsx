import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useMemo, useCallback } from "react";
import { deleteUser } from "../api/users";
import { DeleteDialog } from "./DeleteDialog";
import { useUsers } from "../hooks/useUsers";

export const UsersTable = () => {
	const { rows, total, loading, query, updateParams, refresh } = useUsers();
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [toast, setToast] = useState<{
		open: boolean;
		message: string;
		severity: "success" | "error";
	} | null>(null);

	const handleCloseDeleteDialog = useCallback(() => {
		setDeleteError(null);
		setDeleteId(null);
	}, []);

	const handleDeleteConfirm = useCallback(async () => {
		if (deleteId === null) return;

		setIsDeleting(true);
		setDeleteError(null);

		try {
			await deleteUser(deleteId);
			refresh();
			setDeleteId(null);
			setToast({
				open: true,
				message: "User deleted successfully.",
				severity: "success",
			});
		} catch (error) {
			console.error(error);
			setDeleteError("Unable to delete this user. Please try again.");
			setToast({
				open: true,
				message: "Failed to delete this user.",
				severity: "error",
			});
		} finally {
			setIsDeleting(false);
		}
	}, [deleteId, refresh]);

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
				onClose={handleCloseDeleteDialog}
				onConfirm={handleDeleteConfirm}
				loading={isDeleting}
				error={deleteError ?? undefined}
			/>

			<Snackbar
				open={toast?.open ?? false}
				autoHideDuration={4000}
				onClose={() => setToast(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setToast(null)}
					severity={toast?.severity ?? "success"}
					sx={{ width: "100%" }}
				>
					{toast?.message}
				</Alert>
			</Snackbar>
		</>
	);
};
