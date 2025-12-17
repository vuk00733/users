import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { Filters } from "../components/Filters";
import { UsersTable } from "../components/UsersTable";
import { useUsers } from "../hooks/useUsers";

export const UsersPage = () => {
	const { query, updateParams } = useUsers();

	return (
		<Box sx={{ backgroundColor: "#f5f6fb", minHeight: "100vh", py: 5 }}>
			<Container maxWidth="lg">
				<Stack spacing={3}>
					<Box>
						<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
							Users
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Manage and filter the employee directory quickly.
						</Typography>
					</Box>

					<Paper
						variant="outlined"
						sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: 2 }}
					>
						<Filters query={query} onChange={updateParams} />
					</Paper>

					<Paper
						variant="outlined"
						sx={{
							borderRadius: 3,
							boxShadow: 2,
							overflow: "hidden",
						}}
					>
						<Box sx={{ height: 630 }}>
							<UsersTable />
						</Box>
					</Paper>
				</Stack>
			</Container>
		</Box>
	);
};
