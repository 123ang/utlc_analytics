const TOTAL_USERS = {
    totalUser: 10,
    totalAdmin: 2,
}

export const GET = async () => {
    return Response.json(TOTAL_USERS);
}