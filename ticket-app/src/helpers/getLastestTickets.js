import env from "react-dotenv";

export const getLastestTickets = async () => {
    const response = await fetch(`${env.SERVER_URL}/lastTickets`);
    const body = await response.json();
    console.log(body)
    return body.latest;
}
