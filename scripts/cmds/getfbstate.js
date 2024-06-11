const fs = require("fs-extra");

module.exports = {
	config: {
		name: "getfbstate",
		aliases: ["getstate", "getcookie"],
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Láº¥y fbstate hiá»‡n táº¡i",
			en: "Get current fbstate"
		},
		longDescription: {
			vi: "Láº¥y fbstate hiá»‡n táº¡i",
			en: "Get current fbstate"
		},
		category: "owner",
		guide: {
			en: "   {pn}: get fbstate (appState)\n"
				+ "   {pn} [cookies|cookie|c]: get fbstate with cookies format\n"
				+ "   {pn} [string|str|s]: get fbstate with string format\n",
			vi: "   {pn}: get fbstate (appState)\n"
				+ "   {pn} [cookies|cookie|c]: get fbstate dáº¡ng cookies\n"
				+ "   {pn} [string|str|s]: get fbstate dáº¡ng string\n"
		}
	},

	langs: {
		vi: {
			success: "ÄÃ£ gá»­i fbstate Ä‘áº¿n báº¡n, vui lÃ²ng kiá»ƒm tra tin nháº¯n riÃªng cá»§a bot"
		},
		en: {
			success: "Sent fbstate to you, please check bot's private message"
		}
	},

	onStart: async function ({ message, api, event, args, getLang }) {
		let fbstate;
		let fileName;

		if (["cookie", "cookies", "c"].includes(args[0])) {
			fbstate = JSON.stringify(api.getAppState().map(e => ({
				name: e.key,
				value: e.value
			})), null, 2);
			fileName = "cookies.json";
		}
		else if (["string", "str", "s"].includes(args[0])) {
			fbstate = api.getAppState().map(e => `${e.key}=${e.value}`).join("; ");
			fileName = "cookiesString.txt";
		}
		else {
			fbstate = JSON.stringify(api.getAppState(), null, 2);
			fileName = "appState.json";
		}

		const pathSave = `${__dirname}/tmp/${fileName}`;
		fs.writeFileSync(pathSave, fbstate);

		if (event.senderID != event.threadID)
			message.reply(getLang("success"));

		api.sendMessage({
			body: fbstate,
			attachment: fs.createReadStream(pathSave)
		}, event.senderID, () => fs.unlinkSync(pathSave));
	}
};
