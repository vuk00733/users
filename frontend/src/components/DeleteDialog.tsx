import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

interface Props {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export const DeleteDialog = ({ open, onClose, onConfirm }: Props) => (
	<Dialog open={open} onClose={onClose}>
		<DialogTitle>Delete user?</DialogTitle>
		<DialogContent>
			<DialogContentText>
				This action permanently removes the selected user from the list.
				You can cancel to keep the user or continue if you are sure.
			</DialogContentText>
		</DialogContent>
		<DialogActions sx={{ px: 3, pb: 2 }}>
			<Button onClick={onClose} variant="outlined">
				Keep user
			</Button>
			<Button color="error" onClick={onConfirm} variant="contained">
				Delete permanently
			</Button>
		</DialogActions>
	</Dialog>
);
