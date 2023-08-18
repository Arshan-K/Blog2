const submitBlog = () => {
  const Title = document.getElementById("blogTitle").value;
  const Content = document.getElementById("blogContent").value;

  
  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Title, Content }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Blog post saved successfully!");
      alert("Blog post saved");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to submit the blog post. Please try again.");
    });
};