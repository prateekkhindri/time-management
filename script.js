// 1. Getting the data from the form

const taskList = [];
const badList = [];
const hrPerWeek = 168;

// let total;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  // 6. Not being able to add anything less than 1
  if (hr < 1) {
    return alert("Please enter a positive number");
  }

  const ttlBadHrs = totalBadHours();

  // 5. Making sure the total hrs do not exceed 168 - (16-21)
  const total =
    taskList.reduce((subttl, item) => {
      return subttl + item.hr;
    }, 0) + hr;
  if (ttlBadHrs + total > hrPerWeek) {
    return alert("You have exceeded the maximum number of hours per week");
  }

  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  display();
  totalTaskHours();
};

const display = () => {
  let str = "";
  taskList.map((item, i) => {
    str += `
      <tr>
                    <td>
                      <input type="checkbox" name="" id="" />
                      ${item.task}
                    </td>
                    <td>${item.hr}hr</td>
                    <!-- text-end will push the buttons to the right of the box -->
                    <td class="text-end">
                      <!-- Using bootstrap to control the size of the buttons -->
                      <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">
                        <i class="fa-solid fa-trash" title="Delete"></i>
                      </button>
                      <button class="btn btn-sm btn-success" onclick="markAsNotToDo(${i})">
                        <i
                          class="fa-solid fa-arrow-right"
                          title="Mark as bad list"
                        ></i>
                      </button>
                    </td>
                  </tr>
                  `;
  });
  document.getElementById("task-list").innerHTML = str;
};
const displayBadList = () => {
  //   console.log(taskList);
  let str = "";
  badList.map((item, i) => {
    str += `
      <tr>
                    <td>
                      <input type="checkbox" name="" id="" />
                      ${item.task}
                    </td>
                    <td>${item.hr}hr</td>
                    <!-- text-end will push the buttons to the right of the box -->
                    <td class="text-end">
                      <button class="btn btn-sm btn-warning" onclick="markAsToDo(${i})">
                         <i class="fa-solid fa-arrow-left" title="Mark as good"></i>
                      </button>
                      <button class="btn btn-danger btn-sm" onclick="deleteBadItem(${i})">
                        <i class="fa-solid fa-trash" title="Delete"></i>
                      </button>
                    </td>
                  </tr>
                  `;
  });
  document.getElementById("bad-list").innerHTML = str;
};

// 2. Making the delete button work

// 4. Adding confirm when delete is clicked - put an if condition

const deleteItem = (i) => {
  if (!confirm("Are you sure you want to delete this item?")) {
    // console.log("you said yes");
    return;
  }
  taskList.splice(i, 1);
  display();
  totalTaskHours();
};

// 7. Delete button for the bad list and total calculation
const deleteBadItem = (i) => {
  if (!confirm("Are you sure you want to delete this item?")) {
    return;
  }
  badList.splice(i, 1);
  displayBadList();
  totalTaskHours();
  totalBadHours();
};

// 3. Total of the hours

// 3.1 Making the delete button for the total hours - call the totalTaskHours() inside the deleteItem()

// In 65 after the arrow can also be written as - subttl + item.hr, 0
const totalTaskHours = () => {
  const total = taskList.reduce((subttl, item) => {
    return subttl + item.hr;
  }, 0);

  const ttlBadHrs = totalBadHours();
  const ttlHrs = total + ttlBadHrs;

  document.getElementById("totalHours").innerText = ttlHrs;
  console.log(total);
};
const totalBadHours = () => {
  const total = badList.reduce((subttl, item) => {
    return subttl + item.hr;
  }, 0);
  document.getElementById("totalBadHrs").innerText = total || 0;

  return total;
};

//  6. Working on the Bad-list
const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1);
  display();
  badList.push(itm[0]);
  displayBadList();
  totalBadHours();
};

const markAsToDo = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();

  taskList.push(itm[0]);
  display();
  totalTaskHours();
};
