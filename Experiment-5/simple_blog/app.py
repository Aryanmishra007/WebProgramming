# Project Title: Simple Blog
# Name: Your Name
# Date: April 23, 2026

from flask import Flask, flash, redirect, render_template, request, url_for

app = Flask(__name__)
app.secret_key = "simple-blog-secret-key"

posts = [
    {
        "id": 1,
        "title": "Welcome to Simple Blog",
        "content": "This is a sample post to show how the blog layout works.",
    }
]
next_post_id = 2


@app.route("/")
def index():
    return render_template("index.html", posts=posts)


@app.route("/create", methods=["GET", "POST"])
def create_post():
    global next_post_id

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        if not title or not content:
            flash("Both title and content are required.")
            return render_template("create.html")

        posts.append(
            {
                "id": next_post_id,
                "title": title,
                "content": content,
            }
        )
        next_post_id += 1
        flash("Post created successfully.")
        return redirect(url_for("index"))

    return render_template("create.html")


@app.route("/edit/<int:post_id>", methods=["GET", "POST"])
def edit_post(post_id):
    post = next((item for item in posts if item["id"] == post_id), None)

    if post is None:
        flash("Post not found.")
        return redirect(url_for("index"))

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        if not title or not content:
            flash("Both title and content are required.")
            return render_template("edit.html", post=post)

        post["title"] = title
        post["content"] = content
        flash("Post updated successfully.")
        return redirect(url_for("index"))

    return render_template("edit.html", post=post)


@app.route("/delete/<int:post_id>", methods=["POST"])
def delete_post(post_id):
    global posts

    posts = [post for post in posts if post["id"] != post_id]
    flash("Post deleted successfully.")
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
