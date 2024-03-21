const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "AKIA2BNAEQWUKJBMFIY4",
  secretAccessKey: "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",
});

// console.log("first", process.env.AWS_SECRET_ACCESS_KEY)

const uploadFile = async (file, fileName) => {
  // console.log("")
  const params = {
    Bucket: "applore-dev-projects-1",
    Key: "public/" + fileName,
    Body: file,
    ACL: "public-read",
    CreateBucketConfiguration: {
      LocationConstraint: process.env.S3_REGION,
    },
  };
  // console.log(file);
  console.log("first", process.env.S3_BUCKET_NAME);
  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("err", err);
        reject(err);
      }
      console.log("data", data);
      return resolve(data);
    });
  });
};
// For the Data

module.exports.fileupload = async (req, res, next) => {
  try {
    const { upload } = req.files;
    let imageurl = await uploadFile(upload?.data, upload?.name);
    req.body.upload = imageurl.Location;
    next();
    // return res
    //   .status(200)
    //   .json({ message: "Image Uploaded Successfully !", imageurl });
  } catch (error) {
    console.log("err", error);
    return res.status(400).json({ message: "failure", error });
  }
};
