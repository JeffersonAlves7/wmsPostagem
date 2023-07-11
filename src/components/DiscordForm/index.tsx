import React, { useState } from "react";
import axios from "axios";
import { SubTitle } from "../Texts";
import View from "../View";

const DiscordForm = () => {
  const [message, setMessage] = useState("");

  return (
    <View id="enviarNotificacao">
      <form
        className="flex items-center justify-center gap-3 min-h-[30rem] h-[100vh] w-full flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post("http://localhost:3000/enviar-mensagem", {
              mensagem: message,
            });
            setMessage("");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <SubTitle>Enviar notificação</SubTitle>
        <div>
          <textarea
            className=" border border-slate-200 w-full min-h-[8rem] text-lg p-2 rounded-md shadow-md"
            value={message}
            placeholder="Insira aqui a mensagem"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="p-2 rounded-md text-white bg-blue-600 pl-3 pr-3"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </View>
  );
};

export default DiscordForm;
