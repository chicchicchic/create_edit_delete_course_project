
var courseAPI = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start()


// Các function sẻ viết bên dưới này

// Read (GET)
function getCourses(callback) {
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

// Create course (POST)
function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(courseAPI, options)
        .then(function(response) {
            response.json();
        })
        .then(callback);
}

// Delete course (DELETE)
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    fetch(courseAPI + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {

            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem) {
                // Kiểm tra nếu có item muôn 1xoa1 thì xóa khỏi DOM luôn, không cần gọi API
                courseItem.remove();
            }
        });
}


function renderCourses(courses) {
    var listCourseBlock = document.querySelector('.courses-section .list-course');

    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>

                <button onclick="handleDeleteCourse(${course.id})">Delete</button>
                <button onclick="handleEditCourse(${course.id})">Edit</button>
            </li>
        `;
    
    });
    listCourseBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create-btn');
    
    // Nghe sự kiện click
    createBtn.onclick = function() {
        // Lấy value từ 2 ô input khi users nhập thông tin vào
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="decription"]').value;

        var formData = {
            name: name,
            description: description
        };

        // Create course xong rồi render ra luôn
        createCourse(formData, function() {
            getCourses(renderCourses);
        });
    }
}