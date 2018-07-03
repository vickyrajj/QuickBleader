
$(document).ready(function () {
    var todoList = getStorage() || [];
    if (todoList.length)
        createTodolist();
    $('#addlist').click(function () {
        var toDoText = $('#activity').val().trim();
        if (toDoText === '') {
            updateError('');
            return;
        }
        var indexvalue = todoList.indexOf(toDoText);
        if (indexvalue !== -1) {
            $('#activity').focus();
            updateError('this is already exist');
        } else {
            todoList.push(toDoText);
            putStorage();
            $('#list').append("<li class='list-group-item'><span class='item'>" + toDoText + "</span> <span class = 'close'aria-label='Close' >\u00D7</span></li>");
            $('#activity').val('').focus();
        };
    });
    $('#activity').change(function () {
        clearError();
    })
    $('#list').on('click', '.close', function () {
        var itemElem = $(this).parent('li');
        var itemValue = $(itemElem).find('.item').html().trim();
        var itemIndex = todoList.indexOf(itemValue);
        todoList.splice(itemIndex, 1);
        putStorage();
        $(itemElem).remove();
    });
    function putStorage() {
        var todoListStr = todoList.join(',');

        sessionStorage.todoList = todoListStr;
    }
    function getStorage() {
        if (sessionStorage.todoList == undefined) return [];
        if (sessionStorage.todoList !== undefined) {
            var todoListArr = sessionStorage.todoList.split(',');
            return todoListArr;
        }
    }
    function createTodolist() {
        var items = getStorage();
        items.forEach(element => {
            $('#list').append("<li class='list-group-item'><span class='item'>" + element + "</span> <span class = 'close' aria-label='Close' >\u00D7</span></li>");
            $('#activity').val('').focus();
        });
    }
    function updateError(message) {
        $('.error').text(message);
        $('.error').css('color', 'red');
        $('#activity').css('border-color', 'red');
    }
    function clearError() {
        $('.error').text('');
        $('#activity').css('border-color', '#dddddd')
    }
})
