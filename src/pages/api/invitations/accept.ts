import handler from "../../../server/api-route";
import { decodeInvitationToken } from "../../../server/invitations/token";

/**
 * Users visit this route when accepting an invitation with the invitation token as a query param
 *
 * @example
 * /api/invitations/accept?token=<jwt>
 */
export default handler().get(async (req, res) => {
  const { token } = req.query;
  if (!req.user) {
    res.redirect(`/login?r=/api/invitations/accept/?token=${token}`);
    return;
  }

  if (typeof token !== "string") {
    res
      .status(400)
      .send(
        "Invalid invitation. Please ask the project owner to re-invite you!"
      );
    return;
  }

  const payload = decodeInvitationToken(token);
  if (!payload) {
    res
      .status(400)
      .send(
        "Invalid invitation. Please ask the project owner to re-invite you!"
      );
    return;
  }

  // const { projectId } = payload;
  // const project = await prisma.project.update({
  //   where: {
  //     id: projectId,
  //   },
  //   data: {
  //     contributors: {
  //       connect: {
  //         userMail: req.user?.email,
  //       },
  //     },
  //   },
  // });

  // res.redirect(`/s/${project.slug}`);
});
