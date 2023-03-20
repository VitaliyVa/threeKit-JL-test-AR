import React, { useEffect, useState } from "react";
import load3kit from "./loadThreekit";
import {
  addNewNodePillow,
  addNodeModel,
  setConfiguration,
  updateMaterialPillow,
} from "./utils/helpFunctions";

export const Player = () => {
  load3kit(() => {
    if (window.threekitPlayer) {
      window
        .threekitPlayer({
          threekitUrl: "https://preview.threekit.com/",
          authToken: "032f8ef9-a0c3-414e-ad64-95decaba58b9",
          el: document.getElementById("player"),
          orgId: "8e762fba-3556-4e54-8abf-9880e97c71e1",
          assetId: "818cfc67-3c1f-43c4-ad3b-0becffbe95aa",
          initialConfiguration: {},
          showConfigurator: false,
          showAR: true,
        })
        .then(async function (api) {
          await api.when("loaded");
          window.player = api;
          window.playerT = await api.enableApi("player");
          window.configurator = await api.getConfigurator();
        });
    }
  });

  const addModel = () => {
    const assetId = "20643e44-fecf-437f-b01d-c8fc3ed37322";
    setConfiguration("Models", [{ assetId }]).then(async () => {
      console.log("done");
      const id = addNodeModel(
        assetId,
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      );
      console.log("id: ", id);
    });
  };

  const addPillow = () => {
    const assetId = "c5a4ce58-5304-4c18-9de1-43322cec4f93";
    setConfiguration("setPillows", [{ assetId }]).then(async () => {
      const id = addNewNodePillow(
        `Pillows_${Math.random() * 100}`,
        { x: 0, y: 0.48, z: 0 },
        { x: 0, y: 0, z: 0 },
        assetId
      );
      window.pillowId = id;
      console.log("id: ", id);
    });
  };

  const changeMaterialPillow = () => {
    const assetId = "d39ed599-b611-4ef2-84ea-e5ab45f13bb1";
    const listPillows = [
      {
        id: window.pillowId,
        materialObg: { "Pillow material": { assetId } },
      },
    ];
    updateMaterialPillow(listPillows).then(async () => {
      console.log("done");
    });
  };

  return (
    <>
      <div id="player" className="player" style={{ width: `100%` }}></div>
      <div className="interface" style={{ width: `100%` }}>
        <div onClick={addModel} className="btn">
          ADD MODEL
        </div>
        <div onClick={addPillow} className="btn">
          ADD PILLOW
        </div>
        <div onClick={changeMaterialPillow} className="btn">
          CHANGE MATERIAL PILLOW
        </div>
      </div>
    </>
  );
};
