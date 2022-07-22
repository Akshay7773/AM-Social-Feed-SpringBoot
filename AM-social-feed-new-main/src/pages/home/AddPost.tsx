import {
  Button,
  Card,
  CardActions,
  Grid,
  Snackbar,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import { useRef } from "react";
import Cookie from "js-cookie";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../utils/auth.service";

function AddPost(props: any) {
  const { handleSubmit, register } = useForm();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  interface objType {
    photo: File;
    caption: string;
  }
  const [obj, setObj] = useState<objType>({
    photo: [],
    caption: "",
  });
  const uploadRef = useRef();
  const formss = new FormData();

  const uploaddata = (form: any) => {
    console.log(obj);
    const formss = new FormData();
    formss.append("caption", obj.caption);
    for (let i = 0; i < obj.photo.length; i++) {
      formss.append("image", obj.photo[i]);
    }
    console.log(formss.get("image"));
    authenticationService.addPost(formss).then((res) => {
      console.log(res);
      props.value((prev) => prev + 1);
      formss.delete("image");
      formss.delete("caption");
    });
  };
  return (
    <div>
      {" "}
      <div
        style={{
          height: "50vh",
        }}
      >
        {/* <h1>Posts</h1> */}
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                maxWidth: 400,
                backgroundColor: "rosybrown",
                border: "2px solid black",
                borderRadius: "10px",
                margin: "20px 40px",
                padding: "30px",
                alignItems: "center",
              }}
            >
              <Grid container>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // wordWrap: "none",
                  }}
                >
                  <div>
                    <label style={{ fontWeight: "bold", width: "max-content" }}>
                      Upload Image:{" "}
                    </label>
                  </div>
                  <div>
                    <Grid item>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e: any) =>
                          setObj({
                            ...obj,
                            photo: [...obj.photo, e.target.files[0]],
                          })
                        }
                        size="small"
                        ref={uploadRef}
                        style={{ marginLeft: "20px" }}
                      />
                    </Grid>
                  </div>
                </div>
              </Grid>

              <br />
              <Grid container>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // wordWrap: "none",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        width: "max-content",
                      }}
                    >
                      Caption:{" "}
                    </label>
                  </div>
                  <Grid item>
                    <TextareaAutosize
                      onChange={(e) =>
                        setObj({ ...obj, caption: e.target.value })
                      }
                      // {...register("caption", { required: true })}
                      value={obj.caption}
                      style={{
                        width: "200px",
                        height: "30px",
                        marginLeft: "60px",
                      }}
                    />
                  </Grid>
                </div>
                <br />
                {/* <CardContent></CardContent> */}
                <CardActions>
                  <Button
                    size="small"
                    onClick={handleSubmit(uploaddata)}
                    style={{
                      marginLeft: "130px",
                      background: "indianred",
                      color: "white",
                      marginTop: "10px",
                    }}
                    type="submit"
                  >
                    Upload Post
                  </Button>
                </CardActions>
              </Grid>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
