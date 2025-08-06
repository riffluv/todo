"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { componentStyles } from "@/styles/components";
import { themes } from "@/styles/themes";
import { tokens } from "@/styles/tokens";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaHeart, FaUser } from "react-icons/fa";

const MotionBox = motion.create(Box);

type ViewType = "home" | "saito" | "sakuda";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const handleNavigate = (view: "saito" | "sakuda") => {
    setCurrentView(view);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

  // 熊さんアイコンコンポーネント（デザインシステム準拠）
  const BearIcon = ({
    size = componentStyles.bearIcon.main.size,
    imageSize = componentStyles.bearIcon.main.imageSize,
    position,
    opacity = 1,
    display = "flex"
  }: {
    size?: number;
    imageSize?: number;
    position: { top?: string; left?: string; right?: string; bottom?: string; transform?: string };
    opacity?: number;
    display?: any;
  }) => (
    <Box
      position="absolute"
      {...position}
      w={`${size}px`}
      h={`${size}px`}
      display={display}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/manabyicon.png"
        alt="manaby"
        width={imageSize}
        height={imageSize}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          filter: tokens.shadows.bear,
          opacity,
        }}
      />
    </Box>
  );

  // メッセージボタンコンポーネント（デザインシステム準拠）
  const MessageButton = ({
    onClick,
    label
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <MotionBox {...componentStyles.animations.bounce}>
      <VStack {...componentStyles.button.message.container}>
        <Box {...componentStyles.button.message.icon}>
          <Icon
            as={FaEnvelope}
            boxSize={{ base: 5, md: 6 }}
            color={tokens.colors.primary[500]}
            transition={`all ${tokens.animations.durations.normal} ${tokens.animations.easings.easeOut}`}
          />
        </Box>
        <Text {...componentStyles.button.message.label}>
          {label}
        </Text>
      </VStack>
    </MotionBox>
  );

  // 斎藤さんへのメッセージビュー（テーマシステム準拠）
  const SaitoMessageView = () => (
    <Box {...componentStyles.page.container} {...themes.saito.background}>
      <Container maxW="3xl" py={{ base: 12, md: 20 }} position="relative">
        <VStack gap={{ base: 12, md: 16 }} align="center">
          {/* 戻るボタン */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            alignSelf="flex-start"
          >
            <Button
              {...componentStyles.button.back.secondary}
              onClick={handleBackToHome}
            >
              <Icon as={FaArrowLeft} mr={2} />
              戻る
            </Button>
          </MotionBox>

          {/* ヘッダー */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            textAlign="center"
          >
            <VStack gap={6}>
              <Icon {...themes.saito.header.icon} as={FaUser} />
              <VStack gap={2}>
                <Heading {...themes.saito.header.title}>
                  斎藤さんへ
                </Heading>
                <Text {...themes.saito.header.subtitle}>
                  感謝の手紙
                </Text>
              </VStack>
            </VStack>
          </MotionBox>

          {/* メッセージカード */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Box {...themes.saito.card}>
              <VStack gap={8} textAlign="left" align="stretch">
                <Text {...themes.saito.text.title}>
                  斎藤さん、本当にありがとうございました
                </Text>

                <Box {...themes.saito.text.divider} />

                <VStack gap={6} align="stretch">
                  <Text {...themes.saito.text.body}>
                    斎藤さんがmanaby大宮事業所にいてくれて、本当に心強かったです。
                    分からないことがあったときに、いつも優しく丁寧に教えてくれました。
                  </Text>

                  <Text {...themes.saito.text.body}>
                    特に、Web制作で行き詰まったときに、一緒に考えてくれたり、
                    「大丈夫だよ、一歩ずつ進めばいいんだから」と励ましてくれたりして、
                    何度も救われました。
                  </Text>

                  <Text {...themes.saito.text.body}>
                    斎藤さんの優しさと温かい人柄に、いつも癒されていました。
                    一緒に過ごした時間は、私にとって本当に大切な思い出です。
                  </Text>

                  <Text {...themes.saito.text.body}>
                    就職されてからも、お体に気をつけて、新しい環境でも
                    斎藤さんらしく頑張ってください。いつまでも応援しています。
                  </Text>
                </VStack>

                <Box {...themes.saito.text.divider} />

                <VStack gap={3}>
                  <Text
                    fontSize="md"
                    color={tokens.colors.gray[900]}
                    fontWeight={tokens.typography.fontWeights.semibold}
                    textAlign="center"
                  >
                    改めて、本当にありがとうございました
                  </Text>
                  <Text fontSize="sm" color={tokens.colors.gray[600]}>
                    感謝を込めて
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </MotionBox>

          {/* 戻るボタン（下部） */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              {...componentStyles.button.back.primary}
              onClick={handleBackToHome}
            >
              <Icon as={FaArrowLeft} mr={2} />
              メッセージ一覧に戻る
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );

  // 作田さんへのメッセージビュー（テーマシステム準拠）
  const SakudaMessageView = () => (
    <Box {...componentStyles.page.container} {...themes.sakuda.background}>
      {/* 背景パターン */}
      <Box {...themes.sakuda.background.pattern} />

      <Container maxW="3xl" py={{ base: 8, md: 16 }} position="relative">
        <VStack gap={{ base: 8, md: 12 }} align="center">
          {/* 戻るボタン */}
          <MotionBox
            {...componentStyles.animations.fadeInLeft}
            alignSelf="flex-start"
          >
            <Button
              variant="ghost"
              color={tokens.colors.primary[700]}
              _hover={{ bg: "orange.50" }}
              onClick={handleBackToHome}
            >
              <Icon as={FaArrowLeft} mr={2} />
              戻る
            </Button>
          </MotionBox>

          {/* ヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <VStack gap={4}>
              <Icon {...themes.sakuda.header.icon} as={FaUser} />
              <HStack gap={3}>
                <Heading {...themes.sakuda.header.title}>
                  作田さんへ
                </Heading>
                <Badge {...themes.sakuda.header.badge}>
                  感謝の手紙
                </Badge>
              </HStack>
            </VStack>
          </MotionBox>

          {/* メッセージカード */}
          <MotionBox {...componentStyles.animations.scaleIn}>
            <Box {...themes.sakuda.card}>
              <VStack gap={6} textAlign="left" align="stretch">
                <Text {...themes.sakuda.text.title}>
                  作田さん、本当にありがとうございました
                </Text>

                <Box {...themes.sakuda.text.divider} />

                <VStack gap={4} align="stretch">
                  <Text {...themes.sakuda.text.body}>
                    作田さんと一緒にmanaby大宮事業所で学べて、本当に良かったです。
                    いつも前向きで、一生懸命に取り組む姿勢に、とても刺激を受けました。
                  </Text>

                  <Text {...themes.sakuda.text.body}>
                    困ったときには一緒に悩んでくれて、成功したときには一緒に喜んでくれて、
                    作田さんがいてくれたから、どんな課題も乗り越えることができました。
                  </Text>

                  <Text {...themes.sakuda.text.body}>
                    作田さんの頑張り屋さんなところや、いつも笑顔でいてくれるところが
                    本当に素敵で、私も作田さんのように前向きに頑張ろうと思えました。
                  </Text>

                  <Text {...themes.sakuda.text.body}>
                    就職されてからも、作田さんらしく元気に頑張ってください。
                    きっと新しい職場でも、作田さんの明るさで周りを笑顔にしてくれると思います。
                    心から応援しています！
                  </Text>
                </VStack>

                <Box {...themes.sakuda.text.divider} />

                <VStack gap={2}>
                  <Text
                    fontSize="md"
                    color={tokens.colors.primary[700]}
                    fontWeight={tokens.typography.fontWeights.semibold}
                    textAlign="center"
                  >
                    一緒に頑張れて本当に幸せでした
                  </Text>
                  <HStack gap={2} justify="center">
                    <Icon as={FaHeart} color={tokens.colors.primary[700]} />
                    <Text fontSize="sm" color={tokens.colors.gray[600]} fontStyle="italic">
                      感謝を込めて
                    </Text>
                    <Icon as={FaHeart} color={tokens.colors.primary[700]} />
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </MotionBox>

          {/* 戻るボタン（下部） */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              colorScheme="orange"
              onClick={handleBackToHome}
            >
              <Icon as={FaArrowLeft} mr={2} />
              メッセージ一覧に戻る
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );

  // ホームビュー（デザインシステム準拠）
  const HomeView = () => (
    <Box {...componentStyles.page.container} {...themes.home.background}>
      <Container {...componentStyles.page.content}>
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {/* 熊さんキャラクターヘッダー */}
          <MotionBox {...componentStyles.animations.fadeInUp} textAlign="center">
            <VStack gap={{ base: 10, md: 12 }}>
              {/* 熊さんキャラクター */}
              <Box {...themes.home.character.container}>
                <Image
                  src="/manaby-jump2.png"
                  alt="manaby character"
                  width={100}
                  height={100}
                  style={themes.home.character.image}
                  priority
                />
              </Box>

              {/* 弾むテキストアニメーション */}
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                {...themes.home.textAnimation.container}
              >
                {["T", "h", "a", "n", "k", "s", "!"].map((letter, index) => (
                  <MotionBox
                    key={`${letter}-${index}`}
                    display="inline-block"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      y: 8,
                      filter: "blur(4px)"
                    }}
                    animate={{
                      opacity: [0, 0, 1, 1, 0.8, 1],
                      scale: [0.8, 0.8, 1.05, 1, 1.02, 1],
                      y: [8, 8, -2, 0, 1, 0],
                      filter: [
                        "blur(4px)",
                        "blur(4px)",
                        "blur(0px)",
                        "blur(0px)",
                        "blur(0px)",
                        "blur(0px)"
                      ]
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: index * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.1, 0.25, 0.4, 0.7, 1],
                    }}
                  >
                    <Text {...themes.home.textAnimation.letter}>
                      {letter}
                    </Text>
                  </MotionBox>
                ))}
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* モダンなテキストコンテナ */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            w="100%"
            maxW="600px"
          >
            <VStack {...componentStyles.messageCard.content}>
              {/* メインメッセージ */}
              <Box {...componentStyles.messageCard.container}>
                {/* 熊さんアイコン群 */}
                <BearIcon position={componentStyles.bearIcon.main.position} />
                <BearIcon
                  {...componentStyles.bearIcon.side}
                  position={{ top: "-10px", left: "50%", transform: "translateX(-200%)" }}
                />
                <BearIcon
                  {...componentStyles.bearIcon.side}
                  position={{ top: "-10px", left: "50%", transform: "translateX(100%)" }}
                />

                <VStack gap={6}>
                  <Text {...componentStyles.messageCard.text.label}>
                    お二人へ
                  </Text>

                  <Text {...componentStyles.messageCard.text.primary}>
                    manaby大宮事業所で一緒に学んだ日々は、私にとってとても貴重な時間でした。
                    お二人がいてくれたおかげで、Web制作の勉強も楽しく続けることができました。
                    いつも支えてくれて、本当にありがとうございました。
                    これからもお二人の活躍を心から応援しています。
                  </Text>
                </VStack>
              </Box>

              {/* アクションエリア */}
              <Box w="100%">
                <HStack gap={12} justify="center">
                  <MessageButton
                    onClick={() => handleNavigate("saito")}
                    label="斎藤さんへ"
                  />
                  <MessageButton
                    onClick={() => handleNavigate("sakuda")}
                    label="作田さんへ"
                  />
                </HStack>
              </Box>
            </VStack>
          </MotionBox>

          {/* フッター */}
          <MotionBox {...componentStyles.animations.fadeIn} textAlign="center" mt={8}>
            <Text fontSize="xs" color={tokens.colors.gray[400]} lineHeight="1.5">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );

  // ビューの条件分岐
  switch (currentView) {
    case "saito":
      return <SaitoMessageView />;
    case "sakuda":
      return <SakudaMessageView />;
    default:
      return <HomeView />;
  }
}