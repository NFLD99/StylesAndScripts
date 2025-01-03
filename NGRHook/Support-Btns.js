// ==UserScript==
// @name         Support Btns
// @namespace    http://tampermonkey.net/
// @version      2024-10-27
// @description  try to take over the world!
// @author       You
// @match        https://ngrhook.club/support/tickets/reply*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ngrhook.club
// @grant        none
// ==/UserScript==

const buttons = [
  { text: "Diagnostics Tool", message: "Please download and open The Diagnostics Tool and send a screenshot of it\nv2: https://ngrmedia.nfld99.com/Diagnostics_Tools/Diagnostics_Tool_v2.zip\nYou can use https://imgur.com/upload and send the link here" },
  { text: "Refund Info", message: "Refunds may take up to 5 to 10 business days to process, depending on your bank's policies and processing times." },
  { text: "HWID Info", message: "After getting the HWID Error in the loader, request a HWID reset on the dashboard.\nMake sure to disable your VPN before doing so." },
  { text: "ETA Info", message: "There is currently no ETA.\nYou can check the discord and or the Updates Section on the dashboard for updates.\n\nMaintenance:\nThe product is currently under maintenance.\nYour subscription time will be compensated.\nIf your subscription expires, it will be reactivated.\nFrozen subscriptions will not be compensated." },
  { text: "Windows Defender Info", message: "Download Defender Control using the below link and disable Windows Defender\nhttps://www.sordum.org/9480/defender-control-v2-1" },
  { text: "UAC Info", message: "Please run the below reg file to disable UAC and reboot your system and try again\nhttps://ngr.nfld99.com/assets/regFiles/DisableLUA.zip" },
  { text: "UEFI [1778/1810/1811] Info", message: "Your BIOS is not UEFI.\nRun the following command in a PowerShell window to learn how to fix it:\nStart-Process \"https://www.google.com/search?q=$((Get-WmiObject Win32_BaseBoard).Product + ' Switch from Legacy to UEFI')\"\nYour disks also need to be GPT; you can convert them using https://learn.microsoft.com/en-us/windows/deployment/mbr-to-gpt if they are not GPT." },
  { text: "Vulnerable Driver Blocklist Info", message: "Please run the below reg file to disable the Vulnerable Driver Blocklist and reboot your system and try again\nhttps://ngr.nfld99.com/assets/regFiles/VulnerableDriverBlocklistDisableable.zip" },
  { text: "Unknown Error Info", message: "Reset your password.\nMake it less complex by removing any special characters." },
  { text: "Fortnite Info", message: "Fortnite\nJanuary 10th 2024 is when we released our Fortnite cheat to the public with the intent to become #1 in the Fortnite scene, as we do believe that as a team we have the necessary knowledge and tooling to simply keep many players under the radar while delivering strong, performant products that give our clients the boost needed to outperform others.\nWhen we saw that 98% of the providers are 'slotted' or 'invite only' - which is something we've been against, our amusement went to another level since we could finally show what it means to be truly undetected while handling hundreds of users.\n\nFor the most part - this has been true and evident by the growth of our userbase which was steadily increasing until a few months back when we hit 300 active subscriptions. With our partners and rebrands - at our peak, we've had 814 subscriptions on Fortnite. A massive amount of people no other provider has been able to keep safe.\n\nBack when we had 50-100 users, we would actually buy spoofer subscriptions for people who got 'insta banned' just to prove it was not our cheats' fault. This has been the case with a lot of people to the point where the spoofer subscription we paid for was more expensive than the money we've made from the cheat, due to our rapid growth.\n\nIn the last months however, we've been en-masse registering tickets and complaints on forums like elitepvpers about bans from people who do not know what a spoofer is, never cheated before and had Smoothing set to 1 with FOV to the MAX, tried launching the cheat in game or believe it or not, complained that they used the HWID Reset from the dashboard and thought it was a HWID Spoofer that didn't work. These are just a few of many (what someone would call retarded) reasons of bans/complaints.\n\nOur goal of being a cheap, reliable provider was now being tarnished by people who are so illiterate when it comes to computers, that a chimpanzee with 1 arm amputated would do a better job at loading the cheat.\n\nOur work ethic and effort has been unpaid for and yet our name was still damaged by the few people who were unlucky and got banned due to their stupidity.\n\nAnd then we figured it out... the slots and absurdly high prices on other providers are not there to protect the cheat from being detected, it's simply put - to keep the retards out.\n\nThat's why we've made the definitive decision to shutdown* the public sales of our Fortnite product before the release of our latest, biggest Project: AZRA to protect our interests in this scene. We're aware this decision is very unfortunate for customers who are happy with our products and reached the highest ranks possible, including tournament winnings, but it's for the best.\nOur Fortnite Private will now be application-only, we will release a guide on how to properly apply soon." },
  { text: "Re-Seller/Brand Info", message: "Rebrands: For Apex/Fortnite, the cost is €750 per month. You receive 150 keys initially, with a 60% discount on additional keys thereafter during your payment period. Your ability to generate new accounts and activate generated accounts will be frozen at the end of the month until you renew, activated accounts will remain active.\n\nResellers: 30% discount for orders of €50 or more,\n40% discount for orders of €100 or more,\n50% discount for orders of €200 or more\nCalculators:\nReseller: https://ngr.nfld99.com/Reseller_Calculator\nRebrand: https://ngr.nfld99.com/Rebrand_Calculator" },
  { text: "Media Info", message: "Thank you for taking an intrest in making media for NGR,\nHeres how medai works here:\n1) Buy a key\n2) Make your Video(s)\n3) If We like it we can talk more." },
  { text: "Refund Request Questions", message: "1] Why Would You Like A Refund?\n2] Have You Read Our Refund Policy?\n3] What Email Was Used To Purchase?\n4] If You Bought Through A Reseller, What One?" },
  //{ text: "XX Info", message: "xx" }
];

buttons.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));

const container = document.querySelector("#main > form > div:nth-child(2) > div");

function generatePassword(length) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const allCharacters = upper + lower + digits;

  let password = "";
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += digits.charAt(Math.floor(Math.random() * digits.length));

  for (let i = 3; i < length; i++) {
    password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
}

buttons.forEach(button => {
  const id = button.text.toLowerCase().replace(/ /g, "_");
  const newButton = document.createElement("button");
  newButton.type = "button";
  newButton.className = "btn btn-info";
  newButton.id = id;
  newButton.innerHTML = button.text;
  newButton.addEventListener("click", function() {
    let message = button.message;
    if (button.text === "Unknown Error Info") {
      const randomPasswords = Array.from({ length: 5 }, () => generatePassword(Math.floor(Math.random() * 11 + 10))).join("\n");
      message += `\n\nHere are some randomly generated passwords for reference:\n${randomPasswords}`;
    }
    document.querySelector("#ticket_reply_content").value = message;
  });
  container.appendChild(document.createElement("br"));
  container.appendChild(newButton);
});
