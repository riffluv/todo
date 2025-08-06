/**
 * Messages Data - メッセージデータの定義
 * 
 * @description 拡張性を考慮したメッセージデータの管理
 */

import { PersonConfig } from "@/types/message";

export const messagesData: PersonConfig[] = [
  {
    id: "saito",
    name: "斎藤さん",
    buttonLabel: "斎藤さんへ",
    themeKey: "saito",
    message: {
      title: "斎藤さん、本当にありがとうございました",
      paragraphs: [
        "斎藤さんがmanaby大宮事業所にいてくれて、本当に心強かったです。分からないことがあったときに、いつも優しく丁寧に教えてくれました。",
        "特に、Web制作で行き詰まったときに、一緒に考えてくれたり、「大丈夫だよ、一歩ずつ進めばいいんだから」と励ましてくれたりして、何度も救われました。",
        "斎藤さんの優しさと温かい人柄に、いつも癒されていました。一緒に過ごした時間は、私にとって本当に大切な思い出です。",
        "就職されてからも、お体に気をつけて、新しい環境でも斎藤さんらしく頑張ってください。いつまでも応援しています。"
      ],
      closing: "改めて、本当にありがとうございました",
      signature: "感謝を込めて"
    }
  },
  {
    id: "sakuda",
    name: "作田さん",
    buttonLabel: "作田さんへ",
    themeKey: "sakuda",
    message: {
      title: "作田さん、本当にありがとうございました",
      paragraphs: [
        "作田さんと一緒にmanaby大宮事業所で学べて、本当に良かったです。いつも前向きで、一生懸命に取り組む姿勢に、とても刺激を受けました。",
        "困ったときには一緒に悩んでくれて、成功したときには一緒に喜んでくれて、作田さんがいてくれたから、どんな課題も乗り越えることができました。",
        "作田さんの頑張り屋さんなところや、いつも笑顔でいてくれるところが本当に素敵で、私も作田さんのように前向きに頑張ろうと思えました。",
        "就職されてからも、作田さんらしく元気に頑張ってください。きっと新しい職場でも、作田さんの明るさで周りを笑顔にしてくれると思います。心から応援しています！"
      ],
      closing: "一緒に頑張れて本当に幸せでした",
      signature: "感謝を込めて"
    }
  }
];

/**
 * IDでメッセージデータを取得
 */
export function getMessageById(id: string): PersonConfig | undefined {
  return messagesData.find(person => person.id === id);
}

/**
 * 全てのメッセージデータを取得
 */
export function getAllMessages(): PersonConfig[] {
  return messagesData;
}