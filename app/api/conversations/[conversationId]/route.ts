import getCurrentUser from "actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@libs/prismaDb";
import { pusherServer } from "@libs/pusher";
interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exitingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!exitingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    console.log("currentUser", currentUser);
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasEvery: [currentUser.id],
        },
      },
    });
    console.log("deletedConversation", deletedConversation);

    exitingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          exitingConversation
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
