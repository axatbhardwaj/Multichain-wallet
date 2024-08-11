# Wallet Manager

## Description

This project is an application built with Express and React to create and manage Hierarchical Deterministic (HD) wallets. It provides options to import or create Ethereum (ETH) wallets. By default, it creates one wallet from a mnemonic, but it can create more wallets per mnemonic if required.

## Features

- Create a new Ethereum wallet
- Import an existing Ethereum wallet
- Generate multiple wallets from a single mnemonic
- Manage and view wallet details

## Usage

1. Start the server:
   ```sh
   cd server
   npm start
   ```
2. Start the client:
   ```sh
   cd ../client
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Technologies Used

- Express
- React
- Ethers JS
