const sender = require("../config/email-config");
const TicketRepository = require("../repository/ticket-repository");
const repo = new TicketRepository();
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = await sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
const fetchPendingEmails = async (timeStamp) => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createNoti = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const subscribeEvents = async (payload) => {
  //console.log("Inside Service Layer",data);
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET": {
      //console.log(data);
      await createNoti(data);
      break;
    }
    case "SEND_BASIC_MAIL": {
      await sendBasicEmail(data);
      break;
    }
    default:
      console.log("No Valid Data");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNoti,
  updateTicket,
  subscribeEvents,
};
