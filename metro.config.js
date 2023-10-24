const { getDefaultConfig } = require("@expo/metro-config");

const expoConfig = getDefaultConfig(__dirname);
expoConfig.resolver.assetExts.push("cjs");

const { getDefaultConfig: metroGetDefaultConfig } = require("metro-config");

const metroConfig = async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await metroGetDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
};

module.exports = async () => {
  const [expo, metro] = await Promise.all([expoConfig, metroConfig()]);
  // Объедините объекты конфигурации с помощью оператора распространения
  return {
    ...expo,
    ...metro,
  };
};