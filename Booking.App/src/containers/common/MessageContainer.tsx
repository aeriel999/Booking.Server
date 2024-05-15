import { IMessage } from "./ChatRoom.tsx";

export default function MessageContainer({ messages }: { messages: IMessage[] }) {
    return (
        <>
            {
                messages.map((msg, index) => (
                    <table key={index}>
                        <tbody>
                        <tr>
                            <td>{msg.msg} - {msg.userName}</td>
                        </tr>
                        </tbody>
                    </table>
                ))
            }
        </>
    );
}
