import { TInbox, TConversationHistory } from "./types";

export const DUMMY_INBOX: TInbox[] = [
  {
    subject: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
    participants: [
      {
        name: "Obaidullah Amarkhil",
      },
      {
        name: "Mary Hilda",
      },
      {
        name: "Claren",
      },
    ],
    latest_message: {
      user: {
        name: "Obaidullah Amarkhil",
      },
      content: "Morning. I'll try to do them. Thanks",
      is_unread: true,
      date: 1623241950,
    },
  },
  {
    subject: "109220-Naturalization",
    participants: [
      {
        name: "Cameron Phillips",
      },
      {
        name: "Ellen",
      },
      {
        name: "Claren",
      },
    ],
    latest_message: {
      user: {
        name: "Cameron Phillips",
      },
      content: "Please check this out!",
      is_unread: true,
      date: 1641039000,
    },
  },
  {
    subject:
      "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
    participants: [
      {
        name: "Cameron Phillips",
      },
      {
        name: "Ellen",
      },
      {
        name: "Claren",
      },
    ],
    latest_message: {
      user: {
        name: "Ellen",
      },
      content: "Hey, please read.",
      is_unread: false,
      date: 1622605500,
    },
  },
  {
    subject: "8405-Diana SALAZAR MUNGUIA",
    participants: [
      {
        name: "Cameron Phillips",
      },
      {
        name: "Ellen",
      },
      {
        name: "Claren",
      },
    ],
    latest_message: {
      user: {
        name: "Cameron Phillips",
      },
      content:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      is_unread: false,
      date: 1622524770,
    },
  },
  {
    subject: "FastVisa Support",
    participants: [
      {
        name: "FastVisa Support",
      },
      {
        name: "Claren",
      },
    ],
    latest_message: {
      user: {
        name: "FastVisa Support",
      },
      content: "Hey there! Welcome to your inbox.",
      is_unread: false,
      date: 1622524740,
    },
  },
];

export const DUMMY_GROUP_CONVERSATION_HISTORY: TConversationHistory = [
  {
    user: { name: "Obaidullah Amarkhil" },
    content: "Morning. I'll try to do them. Thanks",
    is_unread: true,
    date: 1623241950,
  },
  {
    user: { name: "Mary Hilda" },
    content: "Sure thing, Claren",
    is_unread: false,
    date: 1623241940,
  },
  {
    user: { name: "Claren" },
    content:
      "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
    is_unread: false,
    date: 1623241930,
  },
  {
    user: { name: "Mary Hilda" },
    content:
      "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    is_unread: false,
    date: 1623241920,
  },
  {
    user: { name: "Claren" },
    content: "No worries. It will be completed ASAP. I've asked him yesterday.",
    is_unread: false,
    date: 1623155520,
  },
];

export const DUMMY_PERSONAL_CONVERSATION_HISTORY: TConversationHistory = [
  {
    user: { name: "Claren" },
    content: "Hi, I need help with something can you help me ?",
    is_unread: false,
    date: 1675600340,
  },
  {
    user: { name: "FastVisa Support" },
    content:
      "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
    is_unread: false,
    date: 1675600320,
  },
];