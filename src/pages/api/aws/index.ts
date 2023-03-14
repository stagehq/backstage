import { s3, s3handler } from "../../../server/aws/handler";

export default s3handler()
  .delete((req, res) => {
    // console.log("Delete file");
    s3.deleteObject;
    res.send("Delete - tb programmed");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });
