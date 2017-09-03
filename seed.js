var StatusENUMS = {
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
};

var todos = {
    1: {title: "Watch Game of thrones", status: StatusENUMS.ACTIVE},
    2: {title: "Watch Breaking Bad", status: StatusENUMS.ACTIVE},
    3: {title: "Watch FRIENDS", status: StatusENUMS.ACTIVE},
    4: {title: "Listen Coldplay", status: StatusENUMS.ACTIVE},
    5: {title: "Listen Steven Wilson", status: StatusENUMS.ACTIVE},
};

var next_todo_id = 6;

module.exports= {
    StatusENUMS  : StatusENUMS,
    todos : todos,
    next_todo_id :next_todo_id
};