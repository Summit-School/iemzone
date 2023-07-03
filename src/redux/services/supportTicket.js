import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/supportTicket`;

const createTicket = async (data) => {
  const response = await axios.post(`${URL}/create-ticket`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getAllTickets = async () => {
  const response = await axios.get(`${URL}/support-tickets`);
  return response.data;
};

const getSingleTicket = async (data) => {
  const response = await axios.get(`${URL}/sungle-ticket/${data.ticketId}`);
  return response.data;
};

const sendTicketMsg = async (data) => {
  const response = await axios.put(
    `${URL}/send-ticket-message/${data.ticketId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const updateTicketStatus = async (data) => {
  const response = await axios.put(
    `${URL}/update-ticket-status/${data.ticketId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const shopServices = {
  createTicket,
  getAllTickets,
  sendTicketMsg,
  getSingleTicket,
  updateTicketStatus,
};

export default shopServices;
