import { React, useState, useEffect } from "react";
import Talk from "talkjs";
import { useCallback } from "react";
import { Session, Popup } from "@talkjs/react";
import axios from "axios";

function CoachChat({ clientId }) {
  const [coach, setCoach] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const coachResponse = await axios.get(
          "http://localhost:8080/api/v1/user/info",
          {
            withCredentials: true,
          }
        );

        const customerResponse = await axios.get(
          `http://localhost:8080/api/v1/coach/client/${clientId}`,
          {
            withCredentials: true,
          }
        );

        if (coachResponse.status == 200 && customerResponse.status == 200) {
          setCoach(coachResponse.data);
          setCustomer(customerResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const syncUser = useCallback(() => {
    return new Talk.User({
      id: coach.id,
      name: coach.firstName + " " + coach.lastName,
      email: coach.email,
      welcomeMessage: `Hi ${customer.firstName},\n\nI'm ${coach.firstName} and I'm glad to be your coach. I'm here to help you achieve your goals. Feel free to ask me anything.`,
      role: "coach",
    });
  }, [coach]);

  const syncConversation = useCallback(
    (session) => {
      const conversationId = `conversation_${customer.userId}_${coach.id}`;
      const conversation = session.getOrCreateConversation(conversationId);

      const other = new Talk.User({
        id: customer.userId,
        name: customer.firstName + " " + customer.lastName,
        email: customer.email,
        role: "customer",
      });

      conversation.setParticipant(session.me);
      conversation.setParticipant(other);

      return conversation;
    },
    [coach, customer]
  );

  if (!coach || !customer) {
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

export default CoachChat;
