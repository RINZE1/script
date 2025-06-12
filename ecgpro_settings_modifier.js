// ecgpro_settings_modifier.js

// 脚本入口函数
function Main(params) {
    let body = $response.body; // 获取原始响应体
    let url = $request.url;    // 获取请求URL

    // 仅针对目标URL进行处理
    if (url.includes("https://www.ecgpro.app/settings-hrv.txt")) {
        try {
            let obj = JSON.parse(body); // 解析JSON

            if (obj && obj.settings) {
                for (let key in obj.settings) {
                    if (obj.settings.hasOwnProperty(key)) {
                        const lowerKey = key.toLowerCase();

                        // 修改包含 "count" 或 "limit" 的值
                        if (lowerKey.includes("count") || lowerKey.includes("limit")) {
                            obj.settings[key] = 100000;
                        }
                        // 修改包含 "purchase" 的值
                        // 注意：这个if应该独立于上一个if，因为一个key可能同时满足purchase和其他条件，
                        // 但根据需求，purchase的修改优先级更高，或者说它们是独立修改的。
                        // 如果一个key是 "purchase-limit"，它会先被设为100000，然后被设为false。
                        // 如果希望 "purchase" 的判断优先，可以调整if/else if结构，或确保命名不会冲突。
                        // 当前逻辑是：如果包含count/limit，设为100000；如果包含purchase，设为false。
                        // 若 "purchase-limit" 存在，它最终会是 false。
                        if (lowerKey.includes("purchase")) {
                            obj.settings[key] = false;
                        }
                    }
                }
                body = JSON.stringify(obj, null, 2); // 将修改后的对象转换回JSON字符串，null, 2用于美化输出
            } else {
                console.log("ECGPro Modifier: 'settings' key not found in response or obj is null.");
            }
        } catch (e) {
            console.log("ECGPro Modifier Error: " + e.toString());
        }
    }

    // 返回修改后的响应体
    $done({ body: body });
}

// Loon 脚本需要一个 $done 回调，即使没有修改，也应该调用 $done 原样返回
// Main 函数是可选的入口，但推荐使用。Loon 会寻找一个无参数的导出函数或 Main 函数。
// 如果你的脚本很简单，可以直接在顶层写逻辑然后 $done()
// 这里我们使用 Main 函数结构
Main();
