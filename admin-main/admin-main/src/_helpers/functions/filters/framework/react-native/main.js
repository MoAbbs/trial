// /* eslint-disable */
// import {get} from 'lodash';
// import shortid from 'shortid';
// import {Platform} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import { post } from 'axios';
// import * as Permissions from 'expo-permissions';
// const config = {
//   headers: {
//     'content-type': 'multipart/form-data',
//   },
// };
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

// export const Navigate = (params, data, state, props)=>{
//   const navigate = params.navigate || props.navigation?.navigate || props.navigate || state.props?.navigate;
//   return navigate({
//     name: params.nav,
//     params: {...data, ...params.params},
//     key: params.nav + shortid(),
//   })
// }
// export const GoBack = (params, data, state, props)=>{
//   const navigate = props.navigation?.goBack || props.goBack || state.props?.goBack;
//   return navigate()
// }
// export const ResetNavigate = (params, data, state, props)=>{
//   const navigate = params.reset || props.reset || props.navigation.reset || state.props?.reset;
//   return navigate(params.nav)
// }
// export const executePropsFun = (params, data, state, props)=>{
//   const fun = get(props, params.fun, get(state.props, params.fun, ()=>{}))
//   return fun(data)
// }
// export const RemoveStorage = (params, data, state, props)=>{
//   return AsyncStorage.removeItem('token').then((d)=>{
//     return d
//   })
// }
// export const ExpoImagePicker = (params, data, state, props)=>{
//   const options = {
//     ...params.options,
//   }
//   if (Platform.OS !== 'web') {
//     return ImagePicker.requestCameraRollPermissionsAsync().then(({status})=>{
//       if (status == 'granted') {
//         // alert('Sorry, we need camera roll permissions to make this work!');
//         return ImagePicker.launchImageLibraryAsync(options);
//       }
//     })
//   }
//   return ImagePicker.launchImageLibraryAsync(options);
// }
