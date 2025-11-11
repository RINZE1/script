if ($request.url.endsWith('settings-hrv.txt')) {
    let body = JSON.parse($response.body);
    if (body.settings) {
        body.settings["hrv-enable-pro-purchase"] = true;
        body.settings["enable-asking-question"] = true;
        body.settings["chatgpt-daily-limit"] = 114514;
        body.settings["hrv-free-count"] = 114514;
        body.settings["more-count-after-rate"] = 114514;
        body.settings["rate-get-more"] = true;
    }
    $done({body: JSON.stringify(body)});
} else {
    $done({});
}
