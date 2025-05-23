/**
 * tools.js - Copyright(C) 2021 Donald Zou 
 */

$(".ip_dropdown").on("change", function () {
    $(".modal.show .btn").removeAttr("disabled");
});

$(".conf_dropdown").on("change", function () {
    $(".modal.show .ip_dropdown").html('<option value="none" selected="selected" disabled>Loading...');
    $.ajax({
        url: "/get_ping_ip",
        method: "POST",
        data: "config=" + $(this).children("option:selected").val(),
        success: function (res) {
            $(".modal.show .ip_dropdown").html("");
            $(".modal.show .ip_dropdown").append('<option value="none" selected="selected" disabled>Choose an IP');
            $(".modal.show .ip_dropdown").append(res);
        }
    });
});
// Ping Tools
$(".send_ping").on("click", function () {
    $(this).attr("disabled", "disabled");
    $(this).html("Pinging...");
    $("#ping_modal .form-control").attr("disabled", "disabled");
    $.ajax({
        method: "POST",
        data: "ip=" + $(':selected', $("#ping_modal .ip_dropdown")).val() +
            "&count=" + $("#ping_modal .ping_count").val(),
        url: "/ping_ip",
        success: function (res) {
            $(".ping_result tbody").html("");
            let html = '<tr><th scope="row">Address</th><td>' + res.address + '</td></tr>' +
                '<tr><th scope="row">Is Alive</th><td>' + res.is_alive + '</td></tr>' +
                '<tr><th scope="row">Min RTT</th><td>' + res.min_rtt + 'ms</td></tr>' +
                '<tr><th scope="row">Average RTT </th><td>' + res.avg_rtt + 'ms</td></tr>' +
                '<tr><th scope="row">Max RTT</th><td>' + res.max_rtt + 'ms</td></tr>' +
                '<tr><th scope="row">Package Sent</th><td>' + res.package_sent + '</td></tr>' +
                '<tr><th scope="row">Package Received</th><td>' + res.package_received + '</td></tr>' +
                '<tr><th scope="row">Package Loss</th><td>' + res.package_loss + '</td></tr>';
            $(".ping_result tbody").html(html);
            $(".send_ping").removeAttr("disabled");
            $(".send_ping").html("Ping");
            $("#ping_modal .form-control").removeAttr("disabled");
        }
    });
});