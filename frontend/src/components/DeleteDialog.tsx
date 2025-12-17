import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";

interface Props {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading?: boolean;
	error?: string;
}

export const DeleteDialog = ({ open, onClose, onConfirm, loading, error }: Props) => (
	<Dialog open={open} onClose={onClose}>
		<DialogTitle>Delete user?</DialogTitle>
		<DialogContent>
			<DialogContentText>
				This action permanently removes the selected user from the list.
				You can cancel to keep the user or continue if you are sure.
			</DialogContentText>
			{error && (
				<Typography color="error" variant="body2" sx={{ mt: 2 }}>
					{error}
				</Typography>
			)}
		</DialogContent>
		<DialogActions sx={{ px: 3, pb: 2 }}>
			<Button onClick={onClose} variant="outlined">
				Keep user
			</Button>
			<Button
				color="error"
				onClick={onConfirm}
				variant="contained"
				disabled={loading}
			>
				Delete permanently
			</Button>
		</DialogActions>
	</Dialog>
);
