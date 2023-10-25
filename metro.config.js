const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = async () => {
  const metroConfig = await defaultConfig;

  return {
    ...metroConfig,
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...metroConfig.resolver,
      assetExts: metroConfig.resolver.assetExts.filter((ext) => ext !== 'svg'), // Фильтруем 'svg'
      sourceExts: [...metroConfig.resolver.sourceExts, 'svg'],
    },
  };
};