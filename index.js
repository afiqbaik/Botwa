import fs from "fs";

import {
    makeWASocketAuto,
    autoReconnect,
    useMultiFileAuthState,
    Button,
    Carousel
} from "@japofc/baileys";

const OWNER_NUMBER = "6285724744152";

const PAYMENT = {
    dana: "08XXXXXXXXXX",
    ovo: "08XXXXXXXXXX",
    gopay: "08XXXXXXXXXX",
    qris: "https://contoh.com/qris"
};

async function sendPayment(sock, jid) {
    const dana = await new Button(sock)
        .setImage(fs.readFileSync("./media/dana.jpg"))
        .setTitle("DANA")
        .addCopy("Dana Payment", PAYMENT.dana)
        .toCard();

    const ovo = await new Button(sock)
        .setImage(fs.readFileSync("./media/ovo.jpg"))
        .setTitle("OVO")
        .addCopy("OVO Payment", PAYMENT.ovo)
        .toCard();

    const gopay = await new Button(sock)
        .setImage(fs.readFileSync("./media/gopay.jpg"))
        .setTitle("GoPay")
        .addCopy("Gopay Payment", PAYMENT.gopay)
        .toCard();

    const qris = await new Button(sock)
        .setImage(fs.readFileSync("./media/qris.jpg"))
        .setTitle("QRIS")
        .addUrl("QRIS Payment", PAYMENT.qris)
        .toCard();

    await new Carousel(sock)
        .setBody("ᴘɪʟɪʜ sᴀʟᴀʜ sᴀᴛᴜ ᴘᴀʏᴍᴇɴᴛ ᴘᴇᴍʙᴀʏᴀʀᴀɴ ʏᴀɴɢ ᴛᴇʀsᴇᴅɪᴀ")
        .addCard([dana, ovo, gopay, qris])
        .send(jid);
}

async function sendProduct(sock, jid) {
    const logo = fs.readFileSync("./media/logo.jpg");


    const panel = await new Button(sock)
        .setImage(logo)
        .setTitle("Panel Pterodactyl")
        .setBody(
            "RAM 1GB : Rp1.000\n" +
            "RAM 2GB : Rp2.000\n" +
            "RAM 3GB : Rp3.000\n" +
            "RAM 4GB : Rp4.000\n" +
            "RAM 5GB : Rp5.000\n" +
            "RAM 6GB : Rp6.000\n" +
            "RAM 7GB : Rp7.000\n" +
            "RAM 8GB : Rp8.000\n" +
            "RAM 9GB : Rp9.000\n" +
            "Unlimited : Rp10.000\n\n" +
            "Server private • Garansi 10 hari"
        )
        .addUrl("Pesan Sekarang", "https://wa.me/6281234567890")
        .toCard();

    const bot = await new Button(sock)
        .setImage(logo)
        .setTitle("Script Bot WhatsApp")
        .setBody(
            "Script bot WhatsApp siap pakai.\n\n" +
            "• Base bot\n" +
            "• Menu & command\n" +
            "• Sistem owner\n" +
            "• Custom fitur\n\n" +
            "Mulai dari Rp50.000"
        )
        .addUrl("Pesan Sekarang", "https://wa.me/6281234567890")
        .toCard();

    const domain = await new Button(sock)
        .setImage(logo)
        .setTitle("Domain")
        .setBody(
            "Jasa pembelian & setup domain.\n\n" +
            "• .com\n" +
            "• .my.id\n" +
            "• .id\n" +
            "• Custom request\n\n" +
            "Mulai dari Rp25.000"
        )
        .addUrl("Pesan Sekarang", "https://wa.me/6281234567890")
        .toCard();

    const nokos = await new Button(sock)
        .setImage(logo)
        .setTitle("Nokos WhatsApp")
        .setBody(
            "Nomor WhatsApp berbagai region.\n\n" +
            "• Indonesia\n" +
            "• USA\n" +
            "• UK\n" +
            "• Region lainnya\n\n" +
            "Harga menyesuaikan stok."
        )
        .addUrl("Cek Stok", "https://wa.me/6281234567890")
        .toCard();

    const jasaBot = await new Button(sock)
        .setImage(logo)
        .setTitle("Jasa Custom Bot")
        .setBody(
            "Jasa pengembangan & perbaikan bot.\n\n" +
            "• Fix error\n" +
            "• Rename bot\n" +
            "• Tambah fitur\n" +
            "• Custom command\n" +
            "• Integrasi API\n\n" +
            "Harga mulai Rp20.000"
        )
        .addUrl("Konsultasi", "https://wa.me/6281234567890")
        .toCard();

    const sosmed = await new Button(sock)
        .setImage(logo)
        .setTitle("Jasa Sosial Media")
        .setBody(
            "Layanan kebutuhan sosial media.\n\n" +
            "• Followers\n" +
            "• Likes\n" +
            "• Views\n" +
            "• Subscribers\n\n" +
            "Instagram • TikTok • Telegram"
        )
        .addUrl("Cek Layanan", "https://wa.me/6281234567890")
        .toCard();

    const install = await new Button(sock)
        .setImage(logo)
        .setTitle("Install Panel")
        .setBody(
            "Jasa instalasi Panel Pterodactyl.\n\n" +
            "• Install panel\n" +
            "• Setup Wings\n" +
            "• Setup node\n" +
            "• Konfigurasi server\n\n" +
            "Mulai dari Rp50.000"
        )
        .addUrl("Pesan Sekarang", "https://wa.me/6281234567890")
        .toCard();

    await new Carousel(sock)
        .setBody(
            "ᴘʀᴏᴅᴜᴋ & ᴊᴀsᴀ\n\n" +
            "Pilih produk atau layanan yang kamu butuhkan.\n" +
            "Swipe untuk melihat katalog."
        )
        .addCard([
            panel,
            bot,
            domain,
            nokos,
            jasaBot,
            sosmed,
            install
        ])
        .send(jid);
}

async function startBot() {
    const { state, saveCreds } =
        await useMultiFileAuthState("./session");

    const manager = autoReconnect(
        () =>
            makeWASocketAuto({
                auth: state,
                printQRInTerminal: true
            }),
        {
            onSocket: (sock) => {
                sock.ev.on("creds.update", saveCreds);

                sock.ev.on("connection.update", ({ connection }) => {
                    if (connection === "open") {
                        console.log("✅ BOT CONNECTED!");
                    }
                });

                sock.ev.on("messages.upsert", async ({ messages }) => {
                    const msg = messages[0];

                    if (!msg.message) return;

                    const text =
                        msg.message.conversation ||
                        msg.message.extendedTextMessage?.text ||
                        "";

                    const allowedCommands = [
                        ".ping",
                        ".payment",
                        ".pay",
                        ".produk",
                        ".product"
                    ];

                    if (msg.key.fromMe && !allowedCommands.includes(text.trim())) {
                        return;
                    }

                    const jid = msg.key.remoteJid;


                    console.log(`[${jid}] ${text}`);

                    if (text.trim() === ".ping") {
                        await sock.sendMessage(jid, {
                            text: "Pong! 🏓"
                        });
                    }
                    if (text.trim() === ".produk" || text.trim() === ".product") {
                        await sendProduct(sock, jid);
                    }
                    if (
                        text.trim() === ".payment" ||
                        text.trim() === ".pay"
                    ) {
                        await sendPayment(sock, jid);
                    }
                });
            },

            onLoggedOut: () => {
                console.log("❌ WhatsApp logout.");
            }
        }
    );

    await manager.start();
}

startBot().catch(console.error);
