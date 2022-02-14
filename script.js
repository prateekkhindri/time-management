// 1. Getting the data from the form

const taskList = [];
const badList = [];
const hrPerWeek = 168;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  display();
  totalTaskHours();
};

const display = () => {
  //   console.log(taskList);
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
                      <button class="btn btn-sm btn-warning">
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
  console.log(str);
};

// 2. Making the delete button work

const deleteItem = (i) => {
  taskList.splice(i, 1);
  display();
  totalTaskHours();
};

// 3. Total of the hours

// In 65 after the arrow can also be written as - subttl + item.hr, 0
const totalTaskHours = () => {
  const total = taskList.reduce((subttl, item) => {
    return subttl + item.hr;
  }, 0);
  document.getElementById("totalHours").innerText = total;
  console.log(total);
};

// 3.1 Making the delete button for the total hours
