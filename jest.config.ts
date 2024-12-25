import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS modules
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/mocks/fileMock.js', // Mock image files
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
            },
        ],
    },
};

export default config;
