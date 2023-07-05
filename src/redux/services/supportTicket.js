import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/support-ticket`;

const createTicket = async (data) => {
  const response = await axios.post(`${URL}/create-ticket`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getAllTickets = async (data) => {
  const response = await axios.get(
    `${URL}/user-support-tickets/${data.userId}`
  );
  return response.data;
};

const getSingleTicket = async (data) => {
  const response = await axios.get(`${URL}/single-ticket/${data.ticketId}`);
  return response.data;
};

const sendTicketMsg = async (data) => {
  console.log(data);
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
