import React from "react";

const SupportTicketForm = () => {
  return (
    <div>
      <Grid>
        <Container
          maxWidth="mds"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
            padding: "none",
          }}
        >
          <Grid
            // elevation={1}
            style={{
              padding: 20,
              marginTop: 10,
              width: "450px",
              height: "552px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="Form-content">
                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 5,
                        }}
                      >
                        <div>
                          <Avatar src={AvatrImg} />
                        </div>
                        <div style={{ marginTop: "2%", marginLeft: "2%" }}>
                          <b>Raise a Ticket</b>
                        </div>
                      </Grid>
                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          //
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginRight: 20,
                            // border: "1px solid black",
                          }}
                        >
                          <div>
                            <label>Ticket I'd</label>
                          </div>
                          <div>
                            <TextField
                              name="title"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              onChange={handelChange}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginRight: 20,
                          }}
                        >
                          <div>
                            <label>Category</label>
                          </div>
                          <div>
                            <TextField
                              name="category"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              onChange={handelChange}
                            />
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: 20,
                          marginTop: 10,
                        }}
                      >
                        <div>
                          <label>Description</label>
                        </div>
                        <div>
                          <TextField
                            // label="Type Here..."
                            name="description"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={handelChange}
                          />
                        </div>
                      </Grid>
                      <div
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{
                          borderRadius: "5px",
                          padding: "10px",
                          marginTop: "20px",
                        }}
                      >
                        <label>Upload</label>
                        <TextField
                          // label="Drag Your File or Browse"
                          fullWidth
                          name="upload"
                          margin="normal"
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={handelChange}
                        />
                        <input type="file" name="upload" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <Button
                          type="submit"
                          style={{
                            color: "#fff",
                            backgroundColor: "black",
                            textTransform: "none",
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
};

export default SupportTicketForm;
