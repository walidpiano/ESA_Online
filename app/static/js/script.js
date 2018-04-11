$(function() {
    var url, type, scroll, article, topic, id, title, content;

    get_all_topics();

    $(".topic-add").click(function () {
        $(this).addClass("current");
        $("#topics").fadeOut(300, function() { $(this).hide(); });
        $("#api-topic").fadeIn(300, function() { $(this).show(); });
        $("#api-topic").find("input[name='title']").val("");
        $("#api-topic").find("input[name='content']").val("");
        $("#api-topic").find("input[name='id']").remove();
    });

    $("#topics").on("click", ".topic-edit", function (event) {
        article = $(this).closest('article');
        id = article.attr("data-id");
        title = article.find("h2").text();
        content = article.find("p").text();
        $("#topics").fadeOut(300, function() { $(this).hide(); });
        $("#api-topic").fadeIn(300, function() { $(this).show(); });
        $("#api-topic").find("input[name='title']").val(title);
        $("#api-topic").find("input[name='content']").val(content);
        $("<input>").attr("type","hidden").attr("name","id").val(id).appendTo("#api-topic");
    });


    $("#api-topic").submit(function(event) {
        event.preventDefault();
        id = $("input[name='id']").val();
        title = $("input[name='title']").val();
        content = $("input[name='content']").val();

        if (Number(id) > 0) {
            type = "PUT";
            url = "/api/topic/update/0".replace(/0/, id.toString());
        } else {
            type = "POST";
            url = "/api/topic/add";
        }

        topic = {
            "title": title,
            "content": content
        };

        $.ajax({
            type: type,
            url: url,
            data: JSON.stringify(topic),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function(response) {
                $(".topic-add").removeClass("current");
                $("#api-topic").find("input[name='title']").val("");
                $("#api-topic").find("input[name='content']").val("");
                $("#api-topic").find("input[name='id']").remove();
                $("#api-topic").fadeOut(300, function() { $(this).hide(); });
                $("#topics").fadeIn(300, function() { $(this).show(); });
                get_all_topics();
                setTimeout(function() {
                    if (Number(id) > 0) {
                        scroll = $("article[data-id='" + id + "']").offset().top;
                    }
                    $("html, body").animate({
                        scrollTop: scroll
                    }, 500);
                }, 500);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#topics").on("click", ".topic-delete", function (event) {
        event.preventDefault();
        article = $(this).closest('article');
        id = article.attr("data-id");
        url = "/api/topic/delete/"+id.toString();
        $.ajax({
            type: "DELETE",
            dataType: "json",
            url: url,
            success: function(response) {
                article.fadeOut(300, function() { article.remove(); });
            },
            error: function (error) {
                console.log(error)
            }
        });
    });
});

function get_all_topics() {
    $("#topics").empty();
    $.ajax({
        type: "GET",
        url: "/api/topic/all",
        dataType: "json",
        success: function(response) {
            $.each(response, function (index, topic) {
                url = "/topic/0".replace(/0/, topic.id.toString());
                $("#topics").append("<article data-id='" + topic.id + "'><header><h2>" + topic.title + "</h2><div><a class='topic-edit button'>Edit</a><a class='topic-delete button'>Delete</a></div></header><p>" + topic.content + "</p></article>");
            });
        }
    });
}