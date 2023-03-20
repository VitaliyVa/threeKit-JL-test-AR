// export const getNameModelById = (state) => (assetId) => {
//     const allModels = getAllModels(state);
//     const findModel = allModels.find(
//       (modelObj) => modelObj["assetId"] === assetId
//     );
//     return findModel?.["name"];
//   };

export const setConfiguration = async (attr, data) => {
  return await window.configurator.setConfiguration({ [attr]: data });
};

export const addNodeModel = (assetId, translation, rotate, modelId) => {
  let parentId = window.player.scene.find({
    from: window.player.instanceId,
    name: "Models",
  });

  if (!parentId) {
    parentId = window.player.instanceId;
  }
  const id = window.player.scene.addNode(
    {
      id: modelId ? modelId : `Model_${Math.random() * 100}`,
      type: "Model",
      name: `${"Model"}_${assetId}_` + Math.random(),
      plugs: {
        Null: [
          {
            type: "Model",
            asset: {
              assetId,
            },
          },
        ],
        Transform: [
          {
            type: "Transform",
            active: true,
            translation: translation,

            rotation: rotate,
          },
        ],
      },
    },
    parentId
  );

  return id;
};

export const addNewNodePillow = (name, translation, rotation, assetId) => {
  let parentId = window.player.scene.find({
    from: window.player.instanceId,
    name: "Layout Container",
  });

  if (!parentId) {
    parentId = window.player.instanceId;
  }

  const id = window.player.scene.addNode(
    {
      id: name ? name : `Pillows_${Math.random() * 100}`,
      type: "Model",
      name: `${"Pillows"}_${assetId}_` + Math.random(),
      plugs: {
        Null: [
          {
            type: "Model",
            asset: {
              assetId,
            },
          },
        ],
        Transform: [
          {
            type: "Transform",
            active: true,
            translation: translation,
            rotation: rotation,
          },
        ],
        Mixer: [
          {
            type: "Mixer",
          },
        ],
        Physics: [
          {
            type: "Collider",
            response: 2,
            shape: 2,
          },
        ],
      },
    },
    parentId
  );

  return id;
};

export const getConfiguratorInstance = (modelId) => {
    return window.playerT.getConfiguratorInstance({
      from: window.playerT.instanceId,
      id: modelId,
      plug: "Null",
      property: "asset",
    });
  };

export const updateMaterialPillow = (listPillows) => {
    let allPush = [];
    let allMaterial = [];
    listPillows.forEach((item, index) => {
      allPush.push(getConfiguratorInstance(item.id));
      allMaterial.push(item.materialObg);
      
    });

    console.log('allMaterial: ', allMaterial);
  
    return Promise.all(allPush).then((resArray) => {
      let allPromisesSetConfiguration = [];
      resArray.forEach((config, index) => {
        console.log('config: ', config);
        if (config) {
          allPromisesSetConfiguration.push(
            config.setConfiguration(allMaterial[index])
          );
        }
      });
      return Promise.all(allPromisesSetConfiguration);
    });
  };
