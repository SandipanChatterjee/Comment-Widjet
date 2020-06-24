let str = "";
const arr = [];
let editCounter = 0;
let inputCounter = 0;

document.getElementById("comment-box").addEventListener("change", (e) => {
  str = str + e.target.value;
});

const btns = (div, flag) => {
  if (flag !== "reply") {
    //delete btn
    let deleteDev = document.createElement("button");
    deleteDev.className = "btn btn-delete";
    deleteDev.innerHTML = "Delete";
    div.appendChild(deleteDev);
    //edit btn
    var edit = document.createElement("button");
    edit.className = "btn btn-edit";
    edit.innerHTML = "Edit";
    edit.id = `edit-${editCounter++}`;
    div.appendChild(edit);
    //reply btn
    let replyBtn = document.createElement("button");
    replyBtn.className = "btn btn-reply";
    replyBtn.innerHTML = "Reply";
    div.appendChild(replyBtn);
    div.appendChild(document.createElement("br"));
  } else {
    //delete btn for reply comments
    let deleteDev = document.createElement("button");
    deleteDev.className = "btn child-btn-delete";
    deleteDev.innerHTML = "Delete";
    deleteDev.id = `delete-${editCounter++}`;
    div.appendChild(deleteDev);
    //edit btn for reply comments
    var edit = document.createElement("button");
    edit.className = "btn child-btn-edit";
    edit.innerHTML = "Edit";
    edit.id = `edit-${editCounter++}`;
    div.appendChild(edit);
    div.appendChild(document.createElement("br"));
  }
};

//add comments
const addComments = () => {
  if (str !== "") {
    //create a new div element and put text in it
    var parentDiv = document.getElementById("comment-list");
    var div = document.createElement("div");
    parentDiv.appendChild(div);

    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = str;
    input.id = `input-${inputCounter++}`;

    // stroing into array
    const obj = {
      parent: str,
      reply: [],
    };
    arr.push(obj);
    input.setAttribute("customAttribute", str);
    input.disabled = true;
    div.appendChild(input);
    div.appendChild(document.createElement("br"));

    btns(div);
  }
  str = "";
  document.getElementById("comment-box").value = "";
};

const commentList = document.getElementById("comment-list");

//delete comments
commentList.addEventListener("click", (e) => {
  const item = e.target;
  if (item.classList[1] === "btn-delete") {
    const comment = item.parentElement;
    // console.log("comment##", comment);
    const str = comment.firstChild.getAttribute("customattribute");

    arr.map((item, index) => {
      if (item.parent === str) {
        //remove from arr
        arr.splice(index, 1);
      }
    });
    // console.log(arr);
    // remove from UI
    comment.remove();
  }

  if (item.classList[1] === "child-btn-delete") {
    const oldParentAttribute = item.parentElement.parentElement.firstChild.getAttribute(
      "customattribute"
    );
    const oldChildAttribute = item.parentElement.firstChild.getAttribute(
      "customattribute"
    );
    if (arr.length > 0) {
      arr.map((item, index) => {
        if (item.parent === oldParentAttribute) {
          item.reply.map((innerItem, innerIndex, array) => {
            console.log("innerItem", innerItem);
            if (innerItem === oldChildAttribute) {
              item.reply.splice(innerIndex, 1);
            }
          });
        }
      });
    }

    item.parentElement.remove();
  }
});

//edit comments
commentList.addEventListener("click", (e) => {
  const item = e.target;
  // console.log(item);
  if (item.classList[1] === "btn-edit") {
    item.parentElement.firstChild.disabled = false;

    let str;
    commentList.addEventListener("change", (e) => {
      str = e.target.value;
    });

    // hiding the edit and delete button and remove <br />
    Array.from(item.parentElement.children).forEach((item, index) => {
      if (index >= 1 && index <= 4) {
        item.style.display = "none";
      }
    });
    // item.parentElement.lastChild.remove();

    //create the ok button
    const newItem = document.createElement("button");
    newItem.innerHTML = "OK";
    newItem.className = "btn";
    newItem.style.marginLeft = "5px";
    newItem.style.marginTop = "10px";
    newItem.style.padding = "2px";
    newItem.style.float = "right";
    item.parentNode.childNodes.length === 6
      ? item.parentElement.appendChild(newItem)
      : item.parentNode.insertBefore(newItem, item.parentNode.childNodes[5]);

    console.log("parentNode ##", item.parentNode.childNodes.length);

    //handleClick
    newItem.addEventListener("click", () => {
      Array.from(item.parentElement.children).forEach((item, index) => {
        if (index >= 1 && index <= 4) {
          item.style.display = "inline-block";
        }
      });
      item.parentElement.firstChild.disabled = true;
      // stroing into array
      const oldAttribute = item.parentElement.firstChild.getAttribute(
        "customattribute"
      );
      if (str === undefined) {
        str = oldAttribute;
      }
      arr.map((item, index, array) => {
        if (item.parent === oldAttribute) {
          array[index].parent = str;
        }
      });

      //changing customattribute in UI
      item.parentElement.firstChild.setAttribute("customattribute", str);
      let i = 5;
      // while (i < item.parentNode.childNodes.length) {
      //   item.parentNode.childNodes[i].remove();
      //   i++;
      // }
      newItem.remove();
    });
  }
  if (item.classList[1] === "child-btn-edit") {
    // console.log("item.parentEl ##", item.parentElement.firstChild);
    item.parentElement.firstChild.disabled = false;

    // console.log("edit-btn id#", item.id);
    let str;

    document
      .getElementById(item.id)
      .parentElement.firstChild.addEventListener("change", (e) => {
        if (e.target.value !== null) {
          str = e.target.value;
        }
      });

    if (str === null) {
      console.log(str);
      str = "";
    }
    Array.from(item.parentElement.children).forEach((item, index) => {
      if (index >= 2 && index <= 3) {
        item.style.display = "none";
      }
    });
    item.parentElement.lastChild.remove();

    //create the ok button
    const newItem = document.createElement("button");
    newItem.innerHTML = "OK";
    newItem.className = "btn";
    newItem.style.marginLeft = "5px";
    newItem.style.marginTop = "10px";
    newItem.style.padding = "2px";
    newItem.style.float = "right";
    item.parentElement.appendChild(newItem);

    //handleClick
    newItem.addEventListener("click", () => {
      item.parentElement.childNodes[2].style.display = "inline-block";
      item.parentElement.childNodes[3].style.display = "inline-block";
      item.parentElement.firstChild.disabled = true;
      // stroing into array
      const oldParentAttribute = item.parentElement.parentElement.firstChild.getAttribute(
        "customattribute"
      );
      const oldChildAttribute = item.parentElement.firstChild.getAttribute(
        "customattribute"
      );
      if (str === undefined) {
        str = oldChildAttribute;
      }
      arr.map((item, index, array) => {
        if (item.parent === oldParentAttribute) {
          item.reply.map((innerItem, innerIndex, innerArray) => {
            if (innerItem === oldChildAttribute) {
              innerArray[innerIndex] = str;
            }
          });
        }
      });
      // console.log(arr);

      //changing customattribute in UI
      item.parentElement.firstChild.setAttribute("customattribute", str);
      item.parentElement.lastChild.style.display = "none";
    });
  }
});

//reply comments

commentList.addEventListener("click", (e) => {
  const item = e.target;
  const parentCustomeAttribute = item.parentElement.firstChild.getAttribute(
    "customattribute"
  );
  if (item.classList[1] === "btn-reply") {
    let input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.style.width = "50%";
    let div = document.createElement("div");
    div.appendChild(input);
    let br = document.createElement("br");
    div.appendChild(br);
    item.parentNode.insertBefore(div, item.parentNode.childNodes[20]);
    let str;

    //before ok click
    input.addEventListener("change", (e) => {
      str = e.target.value;
    });

    const newItem = document.createElement("button");
    newItem.innerHTML = "OK";
    newItem.className = "btn";
    newItem.style.marginLeft = "5px";
    newItem.style.marginTop = "10px";
    newItem.style.padding = "2px";
    newItem.style.float = "right";
    item.parentElement.appendChild(newItem);

    newItem.addEventListener("click", (e) => {
      //after ok click
      btns(div, "reply");
      newItem.style.display = "none";
      input.disabled = true;
      input.setAttribute("customAttribute", str);

      arr.forEach((item, index, array) => {
        if (array[index].parent === parentCustomeAttribute) {
          item.reply.splice(index, 0, str);
        }
      });
      // console.log(arr);
    });
  }
});

viewArray = () => {
  alert(JSON.stringify(arr));
};
