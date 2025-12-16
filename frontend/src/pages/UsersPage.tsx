import { Container, Stack, Typography } from "@mui/material";
import { Filters } from "../components/Filters";
import { UsersTable } from "../components/UsersTable";
import { useUsers } from "../hooks/useUsers";

export const UsersPage = () => {
	const { query, updateParams } = useUsers();

	return (
		<Container maxWidth="xl">
			<Stack spacing={3}>
				<Typography variant="h4">Users</Typography>
				<Filters query={query} onChange={updateParams} />
				<UsersTable />
			</Stack>
		</Container>
	);
};
