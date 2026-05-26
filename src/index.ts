import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { seedDatabase } from './config/seeder';

let server: http.Server;

const startServer = async (): Promise<void> => {
  try {
    // 1. Establish Database Connection
    await connectDB();

    // 2. Baseline Database Seeding (Runs if collections are empty)
    await seedDatabase();

    // 3. Start HTTP Server Listener
    server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('💥 Failed to start portfolio server:', error);
    process.exit(1);
  }
};

// Graceful shutdown sequence handling
const handleShutdown = async (signal: string) => {
  console.log(`\n📶 Received ${signal}. Initiating graceful shutdown sequence...`);

  if (server) {
    server.close(() => {
      console.log('🛑 HTTP server stopped accepting new requests.');

      // Close the MongoDB connection
      mongoose.connection.close()
        .then(() => {
          console.log('📡 MongoDB connection closed successfully.');
          process.exit(0);
        })
        .catch((err) => {
          console.error('❌ Error closing MongoDB connection:', err);
          process.exit(1);
        });
    });
  } else {
    process.exit(0);
  }
};

// Register listeners for system signals
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

// Start server
startServer();