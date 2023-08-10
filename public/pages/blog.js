
const blogPostsElement = document.getElementById("blogPosts");

const displayBlogPosts = (data) => {
  blogPostsElement.innerHTML = "";

 
  data.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
      <h2>${post.Title}</h2>
      <p>${post.Content}</p>
    `;
    blogPostsElement.appendChild(postElement);
  });
};


fetch("/api/posts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Fetched blog posts:", data); 
    displayBlogPosts(data); 
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Failed to fetch blog posts. Please try again.");
  });
