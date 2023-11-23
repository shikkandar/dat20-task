const limit=3;
let currentpage=1;

async function fetchPost() {
//    debugger;
//    let post=JSON.parse(localStorage)
    const res= await fetch('https://jsonplaceholder.typicode.com/posts');
    const data=await res.json();
    localStorage.setItem("post",JSON.stringify(data))
    renderPost(data);
}

function renderPost(data) {
    const postcontainer=document.getElementById("posts")
    postcontainer.innerHTML=data.map((post)=>
        `<div class="col-3 card mt-5">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}<p/>
                <button class="btn btn-danger" onclick="deletePost(${post.id},${post.index})">Delete</button>
            </div>
        </div>`
    ).join()
}
async function deletePost(id,index){
    try {
        const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:"DELETE",
        })
        if (response.ok) {
            let posts =JSON.parse(localStorage.getItem("posts"));
            posts.splice(index,1)
            localStorage.setItem("posts",JSON.stringify(posts));
            fetchPost();
        }
    } catch (error) {
        console.error("Faild to delete",error);
    }
}
async function createPost() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    
    console.log(title);
    const newpost={userId:1,title,body};
    const responce=await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:"post",
        body:JSON.stringify(newpost),
        headers:{"content-type":"application/json; charset=UTF-8"}

       
    })
    const data= await responce.json();
    let posts =JSON.parse(localStorage.getItem("posts")) || [];

    posts.unshift(data);
    localStorage.setItem("posts",JSON.stringify(posts));
    renderPost(posts)
}
fetchPost()
