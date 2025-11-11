if ($request.url.endsWith('settings-hrv.txt')) {
    let body = JSON.parse($response.body);

    if (body.settings) {
        body.settings["hrv-enable-pro-purchase"] = true;
        body.settings["enable-asking-question"] = true;
        body.settings["chatgpt-daily-limit"] = 114514;
    }

    $done({body: JSON.stringify(body)});
} else {
    $done({});
}
