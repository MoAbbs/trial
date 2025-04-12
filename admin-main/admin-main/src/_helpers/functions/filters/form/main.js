// import * as ImagePicker from 'expo-image-picker';
import { post } from 'axios';
// import * as Permissions from 'expo-permissions';
// import { Platform } from 'react-native';
const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};
// export const attachment = async (params, data, state, props) => {
//   try {
//     if (Platform.OS !== 'web') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         // alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//     const {
//       type_fun,
//       url = '/saveAttachment',
//       ext = 'jpeg',
//       type = 'image/jpeg',
//       form,
//       values = form?.values,
//     } = params.props || state.props;
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.cancelled) {
//       const formData = new FormData();
//       let file = { uri: result.uri, type, name: 'file' };
//       if (result.uri.includes('data:')) {
//         file = props.applyFilters({ key: 'dataURLtoFile', filename: 'file.' + ext }, result.uri);
//       }
//       formData.append('file', file);
//       const attachmentType =
//         props.applyFilters(type_fun, undefined, { props: this.props }) || '02E4A084-BD22-498A-AC27-16ED5964C5BC';
//       return post(`${url}?refId=${values?.id}&attachmentType=${attachmentType}`, formData, config).then(({ data }) => {
//         props.applyFilters(
//           {
//             key: 'Dispatching',
//             fun: 'set_data_attachments',
//           },
//           [data],
//         );
//         return data.id;
//       });
//     }
//   } catch (E) {
//     // console.log(E);
//   }
// };
