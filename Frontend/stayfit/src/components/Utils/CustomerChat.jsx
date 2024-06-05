import { React, useState, useEffect } from "react";
import Talk from "talkjs";
import { useCallback } from "react";
import { Session, Popup } from "@talkjs/react";
import axios from "axios";
import API_URL from "../../config";

function CustomerChat() {
  const [customer, setCustomer] = useState(null);
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const customerResponse = await axios.get(
          `${API_URL}/api/v1/user/info`,
          {
            withCredentials: true,
          }
        );

        const coachResponse = await axios.get(
          `${API_URL}/api/v1/customer/coach`,
          {
            withCredentials: true,
          }
        );

        if (customerResponse.status == 200 && coachResponse.status == 200) {
          setCustomer(customerResponse.data);
          setCoach(coachResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const syncUser = useCallback(() => {
    return new Talk.User({
      id: customer.id,
      name: customer.firstName + " " + customer.lastName,
      email: customer.email,
      role: "customer",
    });
  }, [customer]);

  const syncConversation = useCallback(
    (session) => {
      const conversationId = `conversation_${customer.id}_${coach.userId}`;
      const conversation = session.getOrCreateConversation(conversationId);

      const other = new Talk.User({
        id: coach.userId,
        name: coach.firstName + " " + coach.lastName,
        email: coach.email,
        welcomeMessage: `Hi ${customer.firstName},\n\nI'm ${coach.firstName} and I'm glad to be your coach. I'm here to help you achieve your goals. Feel free to ask me anything.`,
        role: "coach",
      });

      conversation.setParticipant(session.me);
      conversation.setParticipant(other);

      return conversation;
    },
    [customer, coach]
  );

  if (!customer || !coach) {
    return null;
  }

  return (
    <div>
      <Session appId="tGcKeyOf" syncUser={syncUser}>
        <Popup syncConversation={syncConversation} show={false} />
      </Session>
    </div>
  );
}

export default CustomerChat;
