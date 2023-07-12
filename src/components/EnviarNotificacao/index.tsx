import { useState } from "react";
import { SubTitle } from "../Texts";
import View from "../View";
import api from "../../api";

const EnviarNotificacao = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    api.api.post("/send-message", {
      message,
    });
  };

  return (
    <View id="enviarNotificacao">
      <div className="flex items-center flex-col gap-4 w-full max-w-[70rem]">
        <SubTitle>Enviar notificação</SubTitle>
        <textarea
          className=" border border-slate-200 w-full min-h-[8rem] text-lg p-2 rounded-md shadow-md"
          value={message}
          placeholder="Insira aqui a mensagem"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="self-start  flex gap-4 items-center justify-center">
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-md text-white bg-blue-600 pl-3 pr-3"
          >
            Enviar
          </button>
        </div>
      </div>
    </View>
  );
};

export default EnviarNotificacao;
