# 日程調整アプリ「ラク調」

![ヘッダー画像](/docs/img/header/header.png)

<br />

## サービスのURL

現在開発中のため非公開です。

<br />

## 概要

友人との日程調整をよりスムーズにストレスフリーにするためのモバイルアプリです。  
以下の特徴を備えることで、煩雑になりがちな日程調整を効率化します！

1. **気軽に誘える掲示板機能**  
  企画者は掲示板形式で簡単にイベントを作成し、友人を気軽に招待できます。  
  複数候補の日程提案もでき、手間のかかる連絡のやり取りを減らします！

2. **瞬時に答えられるスケジュール回答機能**  
  参加者は自身のカレンダーに基づいて、参加可否を瞬時に回答できます。  
  スムーズな日程調整を実現します！


<br />

## サービスへの想い

友人グループで予定を立てるとき、こんな経験はありませんか？  
「なかなか日程が決まらない」「大人数を誘うのが気まずい…」  
私たちが感じたこのような悩みを解消するために、このアプリを開発しました。  
日程調整がスムーズに進まない一因は、参加者がそれぞれ自分の予定を確認し、調整ツールに入力する手間が大きいと考えました。  
私たちはその課題に着目し、誰でも簡単に予定を調整できる仕組みを作ることで、グループの計画がもっと楽しく負担なく進められるアプリケーションの開発を行いました。

<br />

## 開発進捗

現在、このモバイルアプリは開発中ですが、以下の機能がすでに完成しています。

1. **ユーザー管理機能**
    - **アカウント作成・ログイン**：新規ユーザー登録とログインが可能です。
    - **フレンド登録**：友人の検索と登録ができます。

2. **カレンダー管理機能**
    - **日程作成・参照**：予定を作成し、カレンダー上で確認できます。

3. **予定管理機能**
    - **画面UI**：予定管理画面のデザインと基本操作が整っています。

<br />

## 機能一覧

| トップ画面 | アカウント作成画面 | カレンダー画面 |　フレンド一覧画面 |
| ---- | ---- | ---- | ---- |
| ![トップ画面](/docs/img/function-list/top.png) | ![資格選択画面](/docs/img/function-list/signup.png) | ![カレンダー画面](/docs/img/function-list/calendar.png) | ![フレンド画面](/docs/img/function-list/friend.png) |
| アプリ初回起動時の画面です。 | アカウントを作成する画面です。| カレンダーの登録、管理を行えます。 | フレンドを検索、登録できます。 |

<br />

## 使用技術

- **フロントエンド** 
  - React Native
  - TypeScript
  - Recoil (状態管理)
- **データベース** 
  - Cloud Firestore (NoSQL)
- **ビルドツール** 
  - Expo
  - Node
- **インフラ**
  - Firebase (Authentication, Storage) 
- **その他** 
  - Figma 
  - Notion

<br />

## 今後の展望

先ずは2024年中に基本機能の開発完了を目指します。  
着手完了後は以下のような機能を追加する予定です。  

- **他カレンダーとの連携**
  - Googleカレンダーや、iPhoneカレンダーとの同期機能を開発します。
- **Web版の開発**
  - アプリをインストールせずに使用できるWebアプリ版を開発します。
- **通知機能の強化**
  - 参加状況や変更通知をリアルタイムで受け取れるよう改善します。

<br />  